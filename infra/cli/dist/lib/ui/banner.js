"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BANNER = void 0;
const Color = __importStar(require("../ui/colors"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const version = require("../../../package.json").version;
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
exports.BANNER = BANNER = Color.setChars(BANNER, ["#"], "green");
exports.BANNER = BANNER = Color.setChars(BANNER, ["─", "│", "┘", "┐", "┌", "└"], "blue");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFubmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi91aS9iYW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFzQztBQUN0Qyw4REFBOEQ7QUFDOUQsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ3pELE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksT0FBTyxFQUFFLENBQUMsQ0FBQztBQUVsRCxJQUFJLE1BQU0sR0FBRzs7Ozs7Ozs7Ozs7c0JBV1MsR0FBRztDQUN4QixDQUFDO0FBSU8sd0JBQU07QUFIZixpQkFBQSxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoRCxpQkFBQSxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDIn0=