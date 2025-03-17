"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const express_1 = require("express");
const nestjs_i18n_1 = require("nestjs-i18n");
const logger_interceptor_1 = require("./common/interceptors/logger.interceptor");
const middlewares_1 = require("./common/middlewares");
const constants_1 = require("./constants");
const app_module_1 = require("./modules/app/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors(constants_1.CORS);
    app.useGlobalInterceptors(new logger_interceptor_1.LoggerInterceptor());
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new nestjs_i18n_1.I18nValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalFilters(new middlewares_1.ValidationErrorExceptionFilter());
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector), {
        excludePrefixes: ['password', 'createdAt', 'updatedAt', 'isDeleted'],
        ignoreDecorators: true,
    }));
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '50mb' }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API')
        .setDescription('Nestjs Base Template')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const configService = app.get(config_1.ConfigService);
    const PORT = configService.get('PORT');
    const NODE_ENV = configService.get('NODE_ENV');
    await app.listen(PORT).then(() => {
        common_1.Logger.log(`Running on port: ${PORT}`, core_1.NestApplication.name);
        common_1.Logger.log(`Current environment: ${NODE_ENV}`, core_1.NestApplication.name);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map