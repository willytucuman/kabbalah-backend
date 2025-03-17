import { Path } from "nestjs-i18n";
export type I18nTranslations = {
    "emails": {
        "recoverPassword": {
            "subject": string;
            "body": string;
        };
        "newPassword": {
            "subject": string;
            "body": string;
        };
        "resetPassword": {
            "subject": string;
            "body": string;
        };
        "changePassword": string;
        "sendEmailURL": string;
    };
    "errors": {
        "validations": {
            "isUUID": string;
            "isNotEmpty": string;
            "isString": string;
            "isEmail": string;
            "isPositive": string;
            "isDate": string;
            "isPassword": string;
            "wrongBirthdate": string;
            "invalidCredentials": string;
            "samePassword": string;
            "requiredField": string;
            "passwordComparison": string;
        };
        "notFound": string;
        "conflict": string;
        "forbidden": string;
        "fileUpload": string;
        "emailNotRegistered": string;
    };
    "translations": {
        "welcome": string;
    };
};
export type I18nPath = Path<I18nTranslations>;
