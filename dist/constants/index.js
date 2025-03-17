"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTranslation = exports.RoleEnum = exports.CORS = void 0;
const nestjs_i18n_1 = require("nestjs-i18n");
exports.CORS = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
};
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["SUPERADMIN"] = "SUPERADMIN";
    RoleEnum["ADMIN"] = "ADMIN";
    RoleEnum["USER"] = "USER";
})(RoleEnum || (exports.RoleEnum = RoleEnum = {}));
exports.useTranslation = (nestjs_i18n_1.i18nValidationMessage);
//# sourceMappingURL=index.js.map