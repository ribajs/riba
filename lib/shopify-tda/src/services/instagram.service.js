"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
const base_service_1 = require("./base.service");
// TODO move to the-developer-app modul
class InstagramService {
    static async loadMedia(instagramId, limit = 0) {
        const url = `${this.baseUrl}/media/${instagramId}`;
        const data = {
            fields: `caption,comments_count,is_comment_enabled,like_count,media_type,media_url,permalink,timestamp,children{media_type,media_url}`,
            limit,
        };
        if (window.Shopify.shop) {
            data.shop = window.Shopify.shop;
        }
        return core_1.Utils.getJSON(url, data);
    }
}
exports.InstagramService = InstagramService;
InstagramService.baseUrl = base_service_1.BaseService.baseUrl + '/instagram/api';
