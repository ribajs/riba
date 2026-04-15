import { describe, it, expect } from "vitest";
import template from "./tw-steps.component.html?raw";

describe("TwStepsComponent template", () => {
  it("should not contain the typo class text-white2", () => {
    expect(template).not.toContain("text-white2");
  });

  it("should contain the correct class text-white", () => {
    expect(template).toContain("text-white");
  });
});
