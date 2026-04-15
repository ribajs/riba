import { describe, it, expect } from "vitest";
import template from "./tw-accordion.component.html?raw";

describe("TwAccordionComponent template", () => {
  it("contains the accordion structure classes", () => {
    expect(template).toContain("divide-y");
    expect(template).toContain("rounded-lg");
    expect(template).toContain("border");
    expect(template).toContain("tw-accordion-item");
    expect(template).toContain("tw-accordion-header");
  });

  it("has a toggle button with rv-on-click binding", () => {
    expect(template).toContain("rv-on-click");
  });

  it("has aria-expanded binding for accessibility", () => {
    expect(template).toContain("rv-aria-expanded");
  });

  it("does not contain oversized SVG (has h-4 w-4 classes)", () => {
    expect(template).toContain("h-4 w-4");
  });

  it("uses transition for the chevron icon rotation", () => {
    expect(template).toContain("transition-transform");
    expect(template).toContain("rv-class-rotate-180");
  });

  it("renders item title with rv-html binding", () => {
    expect(template).toContain('rv-html="item.title"');
  });

  it("renders item content with rv-template binding", () => {
    expect(template).toContain('rv-template="item.content"');
  });
});
