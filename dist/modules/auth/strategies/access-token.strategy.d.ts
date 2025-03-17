import { ConfigService } from '@nestjs/config';
import { IPayloadJWT } from 'src/common/interfaces/payload.interface';
declare const AccessTokenStrategy_base: new (...args: any[]) => any;
export declare class AccessTokenStrategy extends AccessTokenStrategy_base {
    constructor(configService: ConfigService);
    validate(payload: IPayloadJWT): Promise<{
        userId: string;
        email: string;
        role: string;
    }>;
}
export {};
