import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { I18nTranslations } from 'src/i18n/generated/types';
export declare const CORS: CorsOptions;
export declare enum RoleEnum {
    SUPERADMIN = "SUPERADMIN",
    ADMIN = "ADMIN",
    USER = "USER"
}
export type FileType = 'img' | 'document';
export declare const useTranslation: (key: keyof I18nTranslations | "errors.validations.isUUID" | "errors.validations.isNotEmpty" | "errors.validations.isString" | "errors.validations.isEmail" | "errors.validations.isPositive" | "errors.validations.isDate" | "errors.validations.isPassword" | "errors.validations.wrongBirthdate" | "errors.validations.invalidCredentials" | "errors.validations.samePassword" | "errors.validations.requiredField" | "errors.validations.passwordComparison" | "errors.validations" | "errors.notFound" | "errors.conflict" | "errors.forbidden" | "errors.fileUpload" | "errors.emailNotRegistered" | "emails.recoverPassword.subject" | "emails.recoverPassword.body" | "emails.newPassword.subject" | "emails.newPassword.body" | "emails.resetPassword.subject" | "emails.resetPassword.body" | "emails.recoverPassword" | "emails.newPassword" | "emails.resetPassword" | "emails.changePassword" | "emails.sendEmailURL" | "translations.welcome", args?: any) => (a: import("class-validator").ValidationArguments) => string;
