"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AwsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
const nestjs_i18n_1 = require("nestjs-i18n");
const config_1 = require("../../config");
let AwsService = AwsService_1 = class AwsService {
    constructor(i18n) {
        this.i18n = i18n;
        this.logger = new common_1.Logger(AwsService_1.name);
        this.s3Client = new client_s3_1.S3Client(config_1.awsConfig.client);
    }
    async uploadFile(base64File, fileType) {
        const fileExtensionsByMimetype = {
            'image/jpeg': 'jpg',
            'image/png': 'png',
            'image/gif': 'gif',
            'image/tiff': 'tiff',
            'image/bmp': 'bmp',
            'image/webp': 'webp',
            'image/svg+xml': 'svg',
            'application/pdf': 'pdf',
            'application/msword': 'doc',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
            'application/vnd.ms-excel': 'xls',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
        };
        try {
            const contentType = base64File.split(';')[0].split(':')[1];
            const data = base64File.split(',');
            const buffer = Buffer.from(data[1], 'base64');
            const extension = fileExtensionsByMimetype[contentType] ?? 'file';
            const key = `${fileType}/${crypto.randomUUID()}.${extension}`;
            await this.s3Client.send(new client_s3_1.PutObjectCommand({
                Bucket: config_1.awsConfig.s3.bucket,
                ContentType: contentType,
                Key: key,
                Body: buffer,
            }));
            return `https://${config_1.awsConfig.s3.bucket}.s3.${config_1.awsConfig.client.region}.amazonaws.com/${key}`;
        }
        catch (err) {
            this.logger.error(`Error uploading ${fileType}`, err.stack);
            throw new common_1.InternalServerErrorException(this.i18n.t('errors.fileUpload'));
        }
    }
};
exports.AwsService = AwsService;
exports.AwsService = AwsService = AwsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_i18n_1.I18nService])
], AwsService);
//# sourceMappingURL=aws.service.js.map