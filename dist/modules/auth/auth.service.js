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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const nestjs_i18n_1 = require("nestjs-i18n");
const config_2 = require("../../config");
const password_1 = require("../../utils/password");
const messaging_service_1 = require("../messaging/messaging.service");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, configService, i18n, messagingService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.i18n = i18n;
        this.messagingService = messagingService;
    }
    async register(userData) {
        const user = await this.userService.registerUser(userData);
        const token = await this.jwtService.signAsync({
            id: user.id,
            email: user.email,
            role: user.role,
        }, config_2.jwtConfig.access);
        this.messagingService.sendRegisterUserEmail({
            from: config_2.messagingConfig.emailSender,
            to: user.email,
            redirectUrl: `${config_2.messagingConfig.registerUserUrls.backoffice}/${token}`,
        });
        return user;
    }
    async login(credentials) {
        const findUser = await this.userService.get({
            where: { email: credentials.email },
        });
        if (!findUser) {
            throw new common_1.ForbiddenException(this.i18n.t('errors.validations.invalidCredentials'));
        }
        const isCorrectPassword = await (0, password_1.comparePassword)(credentials.password, findUser.password);
        if (!isCorrectPassword) {
            throw new common_1.ForbiddenException(this.i18n.t('errors.validations.invalidCredentials'));
        }
        const tokens = await this.createTokens({
            id: findUser.id,
            email: findUser.email,
            role: findUser.role,
        });
        const data = {
            user: findUser,
            tokens,
        };
        return data;
    }
    async recoverPassword(body) {
        const { email } = body;
        const findUser = await this.userService.get({
            where: { email },
        });
        if (!findUser) {
            throw new common_1.ForbiddenException(this.i18n.t('errors.emailNotRegistered'));
        }
        const token = await this.jwtService.signAsync({
            id: findUser.id,
            email: findUser.email,
            role: findUser.role,
        }, config_2.jwtConfig.resetPassword);
        await this.messagingService.sendRecoverPasswordEmail({
            from: config_2.messagingConfig.emailSender,
            to: findUser.email,
            redirectUrl: `${config_2.messagingConfig.resetPasswordUrls.backoffice}/${token}`,
        });
        return {
            message: this.i18n.t('emails.sendEmailURL'),
        };
    }
    async resetPassword(id, body) {
        const findUser = await this.userService.getRaw({
            where: {
                id,
            },
            select: {
                id: true,
                email: true,
                role: true,
                password: true,
            },
        });
        if (!findUser)
            throw new common_1.UnauthorizedException();
        if (body.password !== body.confirmPassword) {
            throw new common_1.BadRequestException(this.i18n.t('errors.validations.passwordComparison'));
        }
        const samePassword = await (0, password_1.comparePassword)(body.password, findUser.password);
        if (samePassword) {
            throw new common_1.ForbiddenException(this.i18n.t('errors.validations.samePassword'));
        }
        await this.userService.changePassword(id, body);
        await this.messagingService.sendResetPasswordEmail({
            from: config_2.messagingConfig.emailSender,
            to: findUser.email,
        });
        return {
            message: this.i18n.t('emails.changePassword'),
        };
    }
    async createTokens(payload) {
        return {
            accessToken: await this.jwtService.signAsync(payload, config_2.jwtConfig.access),
            refreshToken: await this.jwtService.signAsync(payload, config_2.jwtConfig.refresh),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService,
        nestjs_i18n_1.I18nService,
        messaging_service_1.MessagingService])
], AuthService);
//# sourceMappingURL=auth.service.js.map