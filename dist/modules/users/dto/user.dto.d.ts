export declare class CreateUserDto {
    name: string;
    lastName: string;
    email: string;
    birthDate: Date;
    nationality: string;
}
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export declare class RegisterUserDto extends CreateUserDto {
    password: string;
}
export declare class RecoverPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    password: string;
    confirmPassword: string;
}
export {};
