"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsConfig = exports.messagingConfig = exports.jwtConfig = void 0;
const env = process.env;
exports.jwtConfig = {
    access: {
        secret: env.JWT_SECRET_KEY,
        expiresIn: env.JWT_EXPIRES_IN,
    },
    refresh: {
        secret: env.JWT_REFRESH_SECRET_KEY,
        expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    },
    resetPassword: {
        secret: env.JWT_RESET_SECRET_KEY,
        expiresIn: env.JWT_RESET_EXPIRES_IN,
    },
};
exports.messagingConfig = {
    emailSender: env.EMAIL_SENDER,
    registerUserUrls: {
        backoffice: env.BACKOFFICE_RESET_PASSWORD_URL,
    },
    resetPasswordUrls: {
        backoffice: env.BACKOFFICE_RESET_PASSWORD_URL,
        app: env.APP_RESET_PASSWORD_URL,
    },
};
exports.awsConfig = {
    client: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        region: env.AWS_REGION,
    },
    s3: {
        bucket: env.S3_BUCKET,
    },
};
//# sourceMappingURL=index.js.map