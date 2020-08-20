import * as Color from "../ui/colors";
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
BANNER = Color.setChars(BANNER, ["#"], "green");
BANNER = Color.setChars(BANNER, ["─", "│", "┘", "┐", "┌", "└"], "blue");

export { BANNER };
