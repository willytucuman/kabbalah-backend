import { Email, EmailService } from '../messaging.types';
export declare class MailjetService implements EmailService {
    private logger;
    private client;
    constructor();
    send(input: Email): Promise<void>;
}
