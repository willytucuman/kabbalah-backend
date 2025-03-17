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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const messaging_types_1 = require("./messaging.types");
let MessagingService = class MessagingService {
    constructor(emailService, i18n) {
        this.emailService = emailService;
        this.i18n = i18n;
    }
    async sendRegisterUserEmail(input) {
        const { from, to, redirectUrl } = input;
        const subject = this.i18n.t('emails.newPassword.subject');
        const body = this.i18n.t('emails.newPassword.body', {
            args: { redirectUrl },
        });
        await this.emailService.send({
            from,
            to,
            subject,
            body,
        });
    }
    async sendResetPasswordEmail(input) {
        const { from, to } = input;
        const subject = this.i18n.t('emails.resetPassword.subject');
        const body = this.i18n.t('emails.resetPassword.body');
        await this.emailService.send({
            from,
            to,
            subject,
            body,
        });
    }
    async sendRecoverPasswordEmail(input) {
        const { from, to, redirectUrl } = input;
        const subject = this.i18n.t('emails.recoverPassword.subject');
        const body = this.i18n.t('emails.recoverPassword.body', {
            args: { redirectUrl },
        });
        await this.emailService.send({
            from,
            to,
            subject,
            body,
        });
    }
};
exports.MessagingService = MessagingService;
exports.MessagingService = MessagingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(messaging_types_1.EMAIL_PROVIDER)),
    __metadata("design:paramtypes", [Object, nestjs_i18n_1.I18nService])
], MessagingService);
//# sourceMappingURL=messaging.service.js.map