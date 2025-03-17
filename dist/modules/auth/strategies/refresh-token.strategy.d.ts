import { ConfigService } from '@nestjs/config';
import { IPayloadJWT } from 'src/common/interfaces/payload.interface';
declare const RefreshTokenStrategy_base: new (...args: any[]) => any;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    constructor(configService: ConfigService);
    validate(payload: IPayloadJWT): {
        userId: string;
        email: string;
        role: string;
    };
}
export {};
