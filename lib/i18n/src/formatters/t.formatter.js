"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
const translate = async (translateMePathString, localesService, langcode) => {
    const properties = translateMePathString.split('.');
    if (!langcode) {
        langcode = localesService.getLangcode();
        if (!langcode) {
            return null;
        }
    }
    return localesService.get([langcode, ...properties] /*, vars */)
        .then((locale) => {
        return locale;
    })
        .catch((error) => {
        console.error(error);
    });
};
const debug = core_1.Debug('formatter:t');
exports.tFormatterWrapper = (localesService) => {
    return {
        name: 't',
        async read(translateMePathString, langcode, ...vars) {
            debug('formatter t', translateMePathString, langcode);
            if (localesService.ready) {
                return translate(translateMePathString, localesService, langcode)
                    .then((locale) => {
                    debug('locale');
                    return locale;
                });
            }
            else {
                return new Promise((resolve, reject) => {
                    localesService.event.on('ready', () => {
                        translate(translateMePathString, localesService, langcode)
                            .then((locale) => {
                            debug('locale');
                            resolve(locale);
                        })
                            .catch((error) => {
                            reject(error);
                        });
                    });
                });
            }
        },
    };
};
