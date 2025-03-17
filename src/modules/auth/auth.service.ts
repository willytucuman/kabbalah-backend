import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { JwtPayload, jwtConfig, messagingConfig } from 'src/config';
import { comparePassword } from 'src/utils/password';
import { MessagingService } from '../messaging/messaging.service';
import {
  RecoverPasswordDto,
  RegisterUserDto,
  ResetPasswordDto,
} from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly i18n: I18nService,
    private messagingService: MessagingService,
  ) {}

  async register(userData: RegisterUserDto) {
    const user = await this.userService.registerUser(userData);
    const token = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      jwtConfig.access,
    );
    this.messagingService.sendRegisterUserEmail({
      from: messagingConfig.emailSender,
      to: user.email,
      redirectUrl: `${messagingConfig.registerUserUrls.backoffice}/${token}`,
    });
    return user;
  }

  async login(credentials: LoginDto) {
    const findUser = await this.userService.get({
      where: { email: credentials.email },
    });
    if (!findUser) {
      throw new ForbiddenException(
        this.i18n.t('errors.validations.invalidCredentials'),
      );
    }
    const isCorrectPassword = await comparePassword(
      credentials.password,
      findUser.password,
    );
    if (!isCorrectPassword) {
      throw new ForbiddenException(
        this.i18n.t('errors.validations.invalidCredentials'),
      );
    }
    const tokens = await this.createTokens({
      id: findUser.id,
      email: findUser.email,
      role: findUser.role,
    });
    const data = {
      user: findUser,
      tokens,
    };

    return data;
  }

  async recoverPassword(body: RecoverPasswordDto) {
    const { email } = body;
    const findUser = await this.userService.get({
      where: { email },
    });
    if (!findUser) {
      throw new ForbiddenException(this.i18n.t('errors.emailNotRegistered'));
    }
    const token = await this.jwtService.signAsync(
      {
        id: findUser.id,
        email: findUser.email,
        role: findUser.role,
      },
      jwtConfig.resetPassword,
    );
    await this.messagingService.sendRecoverPasswordEmail({
      from: messagingConfig.emailSender,
      to: findUser.email,
      redirectUrl: `${messagingConfig.resetPasswordUrls.backoffice}/${token}`,
    });

    return {
      message: this.i18n.t('emails.sendEmailURL'),
    };
  }

  async resetPassword(id: string, body: ResetPasswordDto) {
    const findUser = await this.userService.getRaw({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        role: true,
        password: true,
      },
    });
    if (!findUser) throw new UnauthorizedException();

    if (body.password !== body.confirmPassword) {
      throw new BadRequestException(
        this.i18n.t('errors.validations.passwordComparison'),
      );
    }
    const samePassword = await comparePassword(
      body.password,
      findUser.password,
    );
    if (samePassword) {
      throw new ForbiddenException(
        this.i18n.t('errors.validations.samePassword'),
      );
    }
    await this.userService.changePassword(id, body);
    await this.messagingService.sendResetPasswordEmail({
      from: messagingConfig.emailSender,
      to: findUser.email,
    });
    return {
      message: this.i18n.t('emails.changePassword'),
    };
  }

  private async createTokens(payload: JwtPayload) {
    return {
      accessToken: await this.jwtService.signAsync(payload, jwtConfig.access),
      refreshToken: await this.jwtService.signAsync(payload, jwtConfig.refresh),
    };
  }
}
