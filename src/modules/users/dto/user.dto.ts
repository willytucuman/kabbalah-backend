import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('errors.validations.isNotEmpty'),
  })
  @IsString({
    message: i18nValidationMessage('errors.validations.isString'),
  })
  name: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('errors.validations.isNotEmpty'),
  })
  @IsString({
    message: i18nValidationMessage('errors.validations.isString'),
  })
  lastName: string;

  @ApiProperty({
    description: 'User email',
    example: 'joe@gmail.com',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('errors.validations.isNotEmpty'),
  })
  @IsEmail({}, { message: i18nValidationMessage('errors.validations.isEmail') })
  email: string;

  @ApiProperty({
    description: 'User birthDate',
    example: '1990-01-20',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('errors.validations.isNotEmpty'),
  })
  @IsDate({
    message: i18nValidationMessage('errors.validations.isDate'),
  })
  birthDate: Date;

  @ApiProperty({
    description: 'User nationality',
    example: 'joe@gmail.com',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('errors.validations.isNotEmpty'),
  })
  @IsString({
    message: i18nValidationMessage('errors.validations.isString'),
  })
  nationality: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class RegisterUserDto extends CreateUserDto {
  @ApiProperty({
    description: 'User password',
    example: 'Pass1234',
  })
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
    message: i18nValidationMessage('errors.validations.isPassword'),
  })
  @MinLength(8)
  @IsNotEmpty({
    message: i18nValidationMessage('errors.validations.isNotEmpty'),
  })
  @IsString({
    message: i18nValidationMessage('errors.validations.isString'),
  })
  password: string;
}

export class RecoverPasswordDto {
  @ApiProperty({
    description: 'User email',
    example: 'joe@gmail.com',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('errors.validations.isNotEmpty'),
  })
  @IsEmail(
    {},
    {
      message: i18nValidationMessage('errors.validations.isEmail'),
    },
  )
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    description: 'User password',
    example: 'Pass1234',
  })
  @IsString({
    message: i18nValidationMessage('errors.validations.isString'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('errors.validations.isNotEmpty'),
  })
  @MinLength(8)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
    message: i18nValidationMessage('errors.validations.isPassword'),
  })
  password: string;

  @ApiProperty({
    description: 'User password confirmation',
    example: 'Pass1234',
  })
  @IsString({
    message: i18nValidationMessage('errors.validations.isString'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('errors.validations.isNotEmpty'),
  })
  @MinLength(8)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
    message: i18nValidationMessage('errors.validations.isPassword'),
  })
  confirmPassword: string;
}
