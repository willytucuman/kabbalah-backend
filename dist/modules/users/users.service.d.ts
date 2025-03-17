import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { I18nService } from 'nestjs-i18n';
import { PaginationArgs } from 'src/common/pagination/pagination.dto';
import { MessagingService } from '../messaging/messaging.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, RegisterUserDto, ResetPasswordDto, UpdateUserDto } from './dto/user.dto';
export declare class UsersService {
    private prisma;
    private readonly i18n;
    private jwtService;
    private messagingService;
    private user;
    constructor(prisma: PrismaService, i18n: I18nService, jwtService: JwtService, messagingService: MessagingService);
    getRaw<T extends Prisma.UserFindUniqueArgs>(input: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>): Promise<import("@prisma/client/runtime/library").GetFindResult<Prisma.$UserPayload<import("@prisma/client/runtime/library").DefaultArgs>, T, {}>>;
    get(input: {
        where: Prisma.UserWhereInput;
    }): Promise<{
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
    createUser(body: CreateUserDto): Promise<{
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
    registerUser(body: RegisterUserDto): Promise<{
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
    getAllUsers(pagination: PaginationArgs, userId: string): Promise<{
        data: any;
        page: any;
        perPage: any;
        total: any;
        totalPages: number;
    }>;
    getUserById(id: string): Promise<User>;
    updateUser(id: string, data: UpdateUserDto): Promise<User>;
    deleteUser(id: string): Promise<User>;
    changePassword(id: string, body: ResetPasswordDto): Promise<User>;
}
