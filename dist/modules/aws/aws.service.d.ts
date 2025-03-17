import { I18nService } from 'nestjs-i18n';
import { FileType } from '../../constants';
export declare class AwsService {
    private i18n;
    private s3Client;
    private logger;
    constructor(i18n: I18nService);
    uploadFile(base64File: string, fileType: FileType): Promise<string>;
}
