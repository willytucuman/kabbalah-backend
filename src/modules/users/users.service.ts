import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { I18nService } from 'nestjs-i18n';
import { PaginationParse } from 'src/common/pagination/pagination-query.dto';
import { PaginationArgs } from 'src/common/pagination/pagination.dto';
import { jwtConfig, messagingConfig } from 'src/config';
import { getPaginationFilter, parseDateToRange } from 'src/utils/parsers';
import { hashPassword } from 'src/utils/password';
import { MessagingService } from '../messaging/messaging.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateUserDto,
  RegisterUserDto,
  ResetPasswordDto,
  UpdateUserDto,
} from './dto/user.dto';

@Injectable()
export class UsersService {
  private user: Prisma.UserDelegate;
  constructor(
    private prisma: PrismaService,
    private readonly i18n: I18nService,
    private jwtService: JwtService,
    private messagingService: MessagingService,
  ) {
    this.user = prisma.user;
  }

  async getRaw<T extends Prisma.UserFindUniqueArgs>(
    input: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>,
  ) {
    input.where = {
      ...input.where,
      isDeleted: false,
    };
    return this.user.findUnique<T>(input);
  }

  async get(input: { where: Prisma.UserWhereInput }) {
    const { where } = input;
    const user = await this.user.findFirst({
      where: { ...where, isDeleted: false },
    });
    if (!user) return undefined;
    return user;
  }

  async createUser(body: CreateUserDto) {
    const newPassword = 'M3-2024!';
    const { email } = body;
    const existingActiveUser = await this.get({
      where: { email },
    });

    if (existingActiveUser) {
      throw new ConflictException(
        this.i18n.t('errors.conflict', { args: { model: 'User' } }),
      );
    }
    const user = await this.user
      .create({
        data: {
          ...body,
          password: await hashPassword(newPassword),
        },
      })
      .catch((e) => {
        if (e.code === 'P2002') {
          throw new ConflictException(
            this.i18n.t('errors.conflict', { args: { model: 'User' } }),
          );
        }
        throw e;
      });

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

  async registerUser(body: RegisterUserDto) {
    const { email, password } = body;
    const existingActiveUser = await this.get({
      where: { email },
    });

    if (existingActiveUser) {
      throw new ConflictException(
        this.i18n.t('errors.conflict', { args: { model: 'User' } }),
      );
    }
    const user = await this.user
      .create({
        data: {
          ...body,
          password: await hashPassword(password),
        },
      })
      .catch((e) => {
        if (e.code === 'P2002') {
          throw new ConflictException(
            this.i18n.t('errors.conflict', { args: { model: 'User' } }),
          );
        }
        throw e;
      });
    return user;
  }

  async getAllUsers(pagination: PaginationArgs, userId: string) {
    const { search, date } = pagination;
    const newDate = parseDateToRange(date);

    const where: Prisma.UserWhereInput = {
      id: { not: userId },
      isDeleted: false,
      role: { not: 'SUPERADMIN' },
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(date && { createdAt: newDate }),
    };

    const orderByFilter: Prisma.UserOrderByWithRelationInput = {
      createdAt: 'desc',
    };

    const baseQuery = {
      where,
      orderBy: orderByFilter,
      ...getPaginationFilter(pagination),
    };

    const total = await this.user.count({ where });
    const dataUsers = await this.user.findMany(baseQuery);
    const users = PaginationParse(dataUsers, total, pagination);
    return users;
  }

  async getUserById(id: string): Promise<User> {
    const findUser = await this.user.findUnique({
      where: { id },
    });
    if (!findUser) {
      throw new ForbiddenException(
        this.i18n.t('errors.notFound', { args: { model: 'User' } }),
      );
    }
    return findUser;
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const { email } = data;

    if (email) {
      const existingEmailUser = await this.user.findFirst({
        where: {
          id: { not: id },
          isDeleted: false,
          email,
        },
      });
      if (existingEmailUser) {
        throw new ConflictException(
          this.i18n.t('errors.conflict', { args: { model: 'User' } }),
        );
      }
    }

    const updatedUser = await this.user.update({
      where: { id },
      data,
    });
    return updatedUser;
  }

  async deleteUser(id: string): Promise<User> {
    const deletedUser = await this.user.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
    return deletedUser;
  }

  async changePassword(id: string, body: ResetPasswordDto): Promise<User> {
    const updatedUserPassword = await this.user.update({
      where: { id },
      data: {
        password: await hashPassword(body.password),
      },
    });
    return updatedUserPassword;
  }
}
