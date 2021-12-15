var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Catch, HttpException, Logger, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SsrService } from '../ssr.service';
import { APP_FILTER } from '@nestjs/core';
import { getMessage, getStatus, getStack, handleError } from '../error-handler';
let HttpExceptionFilter = class HttpExceptionFilter {
    constructor(config, ssr) {
        this.config = config;
        this.ssr = ssr;
        this.log = new Logger(this.constructor.name);
        const theme = this.config.get('theme');
        if (!theme) {
            throw new Error('Theme config not defined!');
        }
        this.theme = theme;
    }
    getErrorObject(exception, req, overwriteException) {
        const status = getStatus(overwriteException || exception);
        const message = getMessage(overwriteException || exception);
        const stack = getStack(overwriteException || exception);
        const errorObj = {
            statusCode: status,
            message: message,
            timestamp: new Date().toISOString(),
            stack,
            path: req.url,
        };
        if (overwriteException) {
            errorObj.before = this.getErrorObject(exception, req);
        }
        return errorObj;
    }
    async renderErrorPage(exception, host, componentTagName) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        let overwriteException;
        const sharedContext = await this.ssr.getSharedContext(req, this.theme.templateVars, this.getErrorObject(exception, req, overwriteException));
        try {
            const page = await this.ssr.renderComponent({
                componentTagName,
                sharedContext,
            });
            this.log.debug(`Rendered page component: not-found-page`);
            const html = page.html;
            return {
                hasError: false,
                html,
            };
        }
        catch (error) {
            this.log.error(`Can't render "${componentTagName}":  ${error}`);
            overwriteException = handleError(error);
        }
        return {
            hasError: true,
            html: '',
            exception: overwriteException,
        };
    }
    async catch(exception, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();
        let status = getStatus(exception);
        let overwriteException;
        this.log.debug('catch error: ' + JSON.stringify(exception));
        const errorPageConfig = this.theme.errorRoutes[status];
        if (errorPageConfig) {
            const result = await this.renderErrorPage(exception, host, errorPageConfig.component);
            if (result.hasError) {
                overwriteException = result.exception;
                status = overwriteException ? getStatus(overwriteException) : 500;
            }
            else {
                return res.status(status).send(result.html);
            }
        }
        res
            .status(status)
            .json(this.getErrorObject(exception, req, overwriteException));
    }
};
HttpExceptionFilter = __decorate([
    Catch(HttpException, Error),
    __metadata("design:paramtypes", [ConfigService, SsrService])
], HttpExceptionFilter);
export { HttpExceptionFilter };
export const HttpExceptionFilterProvider = {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
};
//# sourceMappingURL=http-exception.filter.js.map