"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nestjs_i18n_1 = require("nestjs-i18n");
const path = require("path");
const I18nModuleConfig = async () => {
    let options = {
        typesOutputPath: path.join(__dirname, '../../../src/i18n/generated/types.ts'),
        fallbackLanguage: 'es',
        loaderOptions: {
            path: path.join(__dirname, '../../../src/i18n'),
            watch: true,
        },
        resolvers: [
            { use: nestjs_i18n_1.HeaderResolver, options: ['lang'] },
            nestjs_i18n_1.AcceptLanguageResolver,
            new nestjs_i18n_1.HeaderResolver(['x-language']),
        ],
    };
    return nestjs_i18n_1.I18nModule.forRoot(options);
};
exports.default = I18nModuleConfig;
//# sourceMappingURL=i18n.config.js.map