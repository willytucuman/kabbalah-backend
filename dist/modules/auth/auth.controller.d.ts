import { RecoverPasswordDto, RegisterUserDto, ResetPasswordDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    resetPassword(body: ResetPasswordDto, req: any): Promise<{
        message: string;
    }>;
}
