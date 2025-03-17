import { I18nService } from 'nestjs-i18n';
import { EmailService } from './messaging.types';
export declare class MessagingService {
    private emailService;
    private readonly i18n;
    constructor(emailService: EmailService, i18n: I18nService);
    sendRegisterUserEmail(input: {
        from: string;
        to: string;
        redirectUrl: string;
    }): Promise<void>;
    sendResetPasswordEmail(input: {
        from: string;
        to: string;
    }): Promise<void>;
    sendRecoverPasswordEmail(input: {
        from: string;
        to: string;
        redirectUrl: string;
    }): Promise<void>;
}
