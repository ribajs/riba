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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFubmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi91aS9iYW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsb0RBQXNDO0FBQ3RDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUN6RCxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFFbEQsSUFBSSxNQUFNLEdBQUc7Ozs7Ozs7Ozs7O3NCQVdTLEdBQUc7Q0FDeEIsQ0FBQztBQUlPLHdCQUFNO0FBSGYsaUJBQUEsTUFBTSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDaEQsaUJBQUEsTUFBTSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyJ9