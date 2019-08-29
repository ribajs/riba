"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color = __importStar(require("../ui/colors"));
const version = require('../../../package.json').version;
const ver = Color.setString.yellow(`v${version}`);
let BANNER = `
  ┌────────────────────────────────────────┐
  │                                        │
  │      ######  ### ######     #          │
  │      #     #  #  #     #   # #         │
  │      #     #  #  #     #  #   #        │
  │      ######   #  ######  #     #       │
  │      #   #    #  #     # #######       │
  │      #    #   #  #     # #     #       │
  │      #     # ### ######  #     #       │
  │                                        │
  └──────────────── ${ver} ────────────────┘
`;
exports.BANNER = BANNER;
exports.BANNER = BANNER = Color.setChars(BANNER, ['#'], 'green');
exports.BANNER = BANNER = Color.setChars(BANNER, ['─', '│', '┘', '┐', '┌', '└'], 'blue');
