import { PaginationArgs } from 'src/common/pagination/pagination.dto';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    getAllUsers(pagination: PaginationArgs, req: any): Promise<{
        data: any;
        page: any;
        perPage: any;
        total: any;
        totalPages: number;
    }>;
    getUserById(id: string): Promise<{
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
    updateUser(id: string, data: UpdateUserDto): Promise<{
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
    deleteUser(id: string): Promise<{
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
}
