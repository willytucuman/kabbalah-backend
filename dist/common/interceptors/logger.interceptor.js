"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let LoggerInterceptor = class LoggerInterceptor {
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const startTime = Date.now();
        return next.handle().pipe((0, operators_1.tap)((data) => {
            const date = new Date();
            const endTime = Date.now();
            const resTime = endTime - startTime;
            const formatDate = date.toLocaleString('es-AR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            const handler = context.getHandler();
            const handlerName = handler.name || 'Unknown Handler';
            const controller = context.getClass().name;
            console.log('\x1b[37m', `🚀 ${formatDate} - ${request.method} ${request.path} ${response.statusCode} ${resTime}ms - Controller: ${controller} -> ${handlerName}`);
            console.log('\x1b[32m', `✅ RESPONSE: ${JSON.stringify(data, null, 2)}`);
            console.log('\n');
        }), (0, operators_1.catchError)((error) => {
            const handler = context.getHandler();
            const handlerName = handler.name || 'Unknown Handler';
            const controller = context.getClass().name;
            const date = new Date();
            const errorFormatDate = date.toLocaleString('es-AR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            const errorMessage = `❌ ERROR: ${errorFormatDate} - ${request.method} ${request.path} ${error.status || '500'} ${Date.now() - startTime}ms - Controller: ${controller} -> ${handlerName}`;
            const errorDetails = JSON.stringify(error?.response || error?.response?.message, null, 2);
            console.error('\x1b[31m', errorMessage);
            console.error('\x1b[33m', `⚠️ ERROR DETAIL: ${errorDetails}`);
            console.error('\n');
            throw error;
        }));
    }
};
exports.LoggerInterceptor = LoggerInterceptor;
exports.LoggerInterceptor = LoggerInterceptor = __decorate([
    (0, common_1.Injectable)()
], LoggerInterceptor);
//# sourceMappingURL=logger.interceptor.js.map