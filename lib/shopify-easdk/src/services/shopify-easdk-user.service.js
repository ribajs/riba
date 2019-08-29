"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapper_service_1 = require("./wrapper.service");
class UserWrapperService extends wrapper_service_1.WrapperService {
    constructor(shopifyApp) {
        super(shopifyApp);
        if (UserWrapperService.instance) {
            return UserWrapperService.instance;
        }
        UserWrapperService.instance = this;
    }
    get current() {
        if (this.shopifyApp.User) {
            return this.shopifyApp.User.current;
        }
        else {
            // this.shopifyApp.User is undefined if we are not in iframe
            return undefined; // TODO
        }
    }
}
exports.UserWrapperService = UserWrapperService;
