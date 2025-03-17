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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const nestjs_i18n_1 = require("nestjs-i18n");
const pagination_query_dto_1 = require("../../common/pagination/pagination-query.dto");
const config_1 = require("../../config");
const parsers_1 = require("../../utils/parsers");
const password_1 = require("../../utils/password");
const messaging_service_1 = require("../messaging/messaging.service");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma, i18n, jwtService, messagingService) {
        this.prisma = prisma;
        this.i18n = i18n;
        this.jwtService = jwtService;
        this.messagingService = messagingService;
        this.user = prisma.user;
    }
    async getRaw(input) {
        input.where = {
            ...input.where,
            isDeleted: false,
        };
        return this.user.findUnique(input);
    }
    async get(input) {
        const { where } = input;
        const user = await this.user.findFirst({
            where: { ...where, isDeleted: false },
        });
        if (!user)
            return undefined;
        return user;
    }
    async createUser(body) {
        const newPassword = 'M3-2024!';
        const { email } = body;
        const existingActiveUser = await this.get({
            where: { email },
        });
        if (existingActiveUser) {
            throw new common_1.ConflictException(this.i18n.t('errors.conflict', { args: { model: 'User' } }));
        }
        const user = await this.user
            .create({
            data: {
                ...body,
                password: await (0, password_1.hashPassword)(newPassword),
            },
        })
            .catch((e) => {
            if (e.code === 'P2002') {
                throw new common_1.ConflictException(this.i18n.t('errors.conflict', { args: { model: 'User' } }));
            }
            throw e;
        });
        const token = await this.jwtService.signAsync({
            id: user.id,
            email: user.email,
            role: user.role,
        }, config_1.jwtConfig.access);
        this.messagingService.sendRegisterUserEmail({
            from: config_1.messagingConfig.emailSender,
            to: user.email,
            redirectUrl: `${config_1.messagingConfig.registerUserUrls.backoffice}/${token}`,
        });
        return user;
    }
    async registerUser(body) {
        const { email, password } = body;
        const existingActiveUser = await this.get({
            where: { email },
        });
        if (existingActiveUser) {
            throw new common_1.ConflictException(this.i18n.t('errors.conflict', { args: { model: 'User' } }));
        }
        const user = await this.user
            .create({
            data: {
                ...body,
                password: await (0, password_1.hashPassword)(password),
            },
        })
            .catch((e) => {
            if (e.code === 'P2002') {
                throw new common_1.ConflictException(this.i18n.t('errors.conflict', { args: { model: 'User' } }));
            }
            throw e;
        });
        return user;
    }
    async getAllUsers(pagination, userId) {
        const { search, date } = pagination;
        const newDate = (0, parsers_1.parseDateToRange)(date);
        const where = {
            id: { not: userId },
            isDeleted: false,
            role: { not: 'SUPERADMIN' },
            ...(search && {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { lastName: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                ],
            }),
            ...(date && { createdAt: newDate }),
        };
        const orderByFilter = {
            createdAt: 'desc',
        };
        const baseQuery = {
            where,
            orderBy: orderByFilter,
            ...(0, parsers_1.getPaginationFilter)(pagination),
        };
        const total = await this.user.count({ where });
        const dataUsers = await this.user.findMany(baseQuery);
        const users = (0, pagination_query_dto_1.PaginationParse)(dataUsers, total, pagination);
        return users;
    }
    async getUserById(id) {
        const findUser = await this.user.findUnique({
            where: { id },
        });
        if (!findUser) {
            throw new common_1.ForbiddenException(this.i18n.t('errors.notFound', { args: { model: 'User' } }));
        }
        return findUser;
    }
    async updateUser(id, data) {
        const { email } = data;
        if (email) {
            const existingEmailUser = await this.user.findFirst({
                where: {
                    id: { not: id },
                    isDeleted: false,
                    email,
                },
            });
            if (existingEmailUser) {
                throw new common_1.ConflictException(this.i18n.t('errors.conflict', { args: { model: 'User' } }));
            }
        }
        const updatedUser = await this.user.update({
            where: { id },
            data,
        });
        return updatedUser;
    }
    async deleteUser(id) {
        const deletedUser = await this.user.update({
            where: { id },
            data: {
                isDeleted: true,
            },
        });
        return deletedUser;
    }
    async changePassword(id, body) {
        const updatedUserPassword = await this.user.update({
            where: { id },
            data: {
                password: await (0, password_1.hashPassword)(body.password),
            },
        });
        return updatedUserPassword;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        nestjs_i18n_1.I18nService,
        jwt_1.JwtService,
        messaging_service_1.MessagingService])
], UsersService);
//# sourceMappingURL=users.service.js.map