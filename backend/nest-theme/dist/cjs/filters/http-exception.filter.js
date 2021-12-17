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
exports.HttpExceptionFilterProvider = exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const node_ssr_1 = require("@ribajs/node-ssr");
const config_1 = require("@nestjs/config");
const ssr_service_1 = require("../ssr.service");
const core_1 = require("@nestjs/core");
let HttpExceptionFilter = class HttpExceptionFilter {
    constructor(config, ssr) {
        this.config = config;
        this.ssr = ssr;
        this.log = new common_1.Logger(this.constructor.name);
        const theme = this.config.get('theme');
        if (!theme) {
            throw new Error('Theme config not defined!');
        }
        this.theme = theme;
    }
    getErrorObject(exception, req, overwriteException) {
        const status = (0, node_ssr_1.getStatus)(overwriteException || exception);
        const message = (0, node_ssr_1.getMessage)(overwriteException || exception);
        const stack = (0, node_ssr_1.getStack)(overwriteException || exception);
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
        const httpCtx = host.switchToHttp();
        const req = httpCtx.getRequest();
        let overwriteException;
        const sharedContext = await this.ssr.getSharedContext(req, this.theme.templateVars, this.getErrorObject(exception, req, overwriteException));
        let renderResult;
        try {
            renderResult = await this.ssr.renderComponent({
                componentTagName,
                sharedContext,
            });
            this.log.debug(`Rendered page component: ` + componentTagName);
            return {
                hasError: false,
                ...renderResult,
            };
        }
        catch (error) {
            this.log.error(`Can't render "${componentTagName}":  ${error}`);
            overwriteException = (0, node_ssr_1.handleError)(error);
        }
        return {
            hasError: true,
            html: '',
            exception: overwriteException,
            output: [],
        };
    }
    async catch(exception, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();
        let status = (0, node_ssr_1.getStatus)(exception);
        let overwriteException;
        this.log.debug('catch error: ' + JSON.stringify(exception));
        const errorPageConfig = this.theme.errorRoutes[status];
        if (errorPageConfig) {
            const result = await this.renderErrorPage(exception, host, errorPageConfig.component);
            if (result.output)
                this.ssr.logOutput(result.output);
            if (result.hasError) {
                overwriteException = result.exception;
                status = overwriteException ? (0, node_ssr_1.getStatus)(overwriteException) : 500;
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
    (0, common_1.Catch)(common_1.HttpException, Error),
    __metadata("design:paramtypes", [config_1.ConfigService, ssr_service_1.SsrService])
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilterProvider = {
    provide: core_1.APP_FILTER,
    useClass: HttpExceptionFilter,
};
//# sourceMappingURL=http-exception.filter.js.map