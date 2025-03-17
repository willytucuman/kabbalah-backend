import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { MessagingService } from '../messaging/messaging.service';
import { RecoverPasswordDto, RegisterUserDto, ResetPasswordDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    private configService;
    private readonly i18n;
    private messagingService;
    constructor(userService: UsersService, jwtService: JwtService, configService: ConfigService, i18n: I18nService, messagingService: MessagingService);
    register(userData: RegisterUserDto): Promise<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        lastName: string;
        email: string;
        birthDate: Date;
        nationality: string;
        password: string;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        isDeleted: boolean;
    }>;
    login(credentials: LoginDto): Promise<{
        user: {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            lastName: string;
            email: string;
            birthDate: Date;
            nationality: string;
            password: string;
            id: string;
            role: import(".prisma/client").$Enums.Role;
            isActive: boolean;
            isDeleted: boolean;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    recoverPassword(body: RecoverPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(id: string, body: ResetPasswordDto): Promise<{
        message: string;
    }>;
    private createTokens;
}
