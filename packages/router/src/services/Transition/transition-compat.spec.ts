import { describe, expect, it } from "vitest";
import { CustomTransition } from "./CustomTransition.js";
import { FadeTransition } from "./FadeTransition.js";
import { HideShowTransition } from "./HideShowTransition.js";

describe("transition compatibility wrappers", () => {
  it("provides declarative definitions for class transitions", () => {
    expect(HideShowTransition.asDefinition().name).toBe("hide-show");
    expect(FadeTransition.asDefinition().name).toBe("fade");
    expect(CustomTransition.asDefinition().name).toBe("custom");
  });

  it("HideShowTransition.asDefinition has leave hook", () => {
    const def = HideShowTransition.asDefinition();
    expect(typeof def.leave).toBe("function");
  });

  it("FadeTransition.asDefinition has leave and enter hooks", () => {
    const def = FadeTransition.asDefinition();
    expect(typeof def.leave).toBe("function");
    expect(typeof def.enter).toBe("function");
  });
});
