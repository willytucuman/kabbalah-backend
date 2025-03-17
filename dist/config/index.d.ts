export declare const jwtConfig: {
    readonly access: {
        readonly secret: string;
        readonly expiresIn: string;
    };
    readonly refresh: {
        readonly secret: string;
        readonly expiresIn: string;
    };
    readonly resetPassword: {
        readonly secret: string;
        readonly expiresIn: string;
    };
};
export type JwtPayload = {
    id: string;
    email: string;
    role: string;
};
export declare const messagingConfig: {
    readonly emailSender: string;
    readonly registerUserUrls: {
        readonly backoffice: string;
    };
    readonly resetPasswordUrls: {
        readonly backoffice: string;
        readonly app: string;
    };
};
export declare const awsConfig: {
    readonly client: {
        readonly accessKeyId: string;
        readonly secretAccessKey: string;
        readonly region: string;
    };
    readonly s3: {
        readonly bucket: string;
    };
};
