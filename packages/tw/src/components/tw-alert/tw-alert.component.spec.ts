import { describe, it, expect } from "vitest";
import template from "./tw-alert.component.html?raw";

describe("TwAlertComponent template", () => {
  it("contains blue color classes for info type", () => {
    expect(template).toContain("bg-blue-50");
    expect(template).toContain("text-blue-800");
    expect(template).toContain("border-blue-300");
  });

  it("contains green color classes for success type", () => {
    expect(template).toContain("bg-green-50");
    expect(template).toContain("text-green-800");
    expect(template).toContain("border-green-300");
  });

  it("contains yellow color classes for warning type", () => {
    expect(template).toContain("bg-yellow-50");
    expect(template).toContain("text-yellow-800");
    expect(template).toContain("border-yellow-300");
  });

  it("contains red color classes for error type", () => {
    expect(template).toContain("bg-red-50");
    expect(template).toContain("text-red-800");
    expect(template).toContain("border-red-300");
  });

  it("has a dismiss button with rv-on-click=\"dismiss\"", () => {
    expect(template).toContain('rv-on-click="dismiss"');
  });

  it("has the dismiss button conditionally shown via rv-if=\"dismissible\"", () => {
    expect(template).toContain('rv-if="dismissible"');
  });

  it("has role=\"alert\" for accessibility", () => {
    expect(template).toContain('role="alert"');
  });

  it("displays title and message via rv-text bindings", () => {
    expect(template).toContain('rv-text="title"');
    expect(template).toContain('rv-text="message"');
  });
});
