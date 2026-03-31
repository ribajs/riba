import { FormatterService } from "./formatter.service.js";
import { dividedByFormatter } from "../formatters/math/divided-by.formatter.js";

describe("FormatterService", () => {
  it("registers a camelCase alias for kebab-case canonical formatter names", () => {
    const svc = new FormatterService({});
    svc.register(dividedByFormatter);
    const elements = (svc as unknown as { elements: Record<string, unknown> })
      .elements;
    expect(elements["divided-by"]).toBe(dividedByFormatter);
    expect(elements["dividedBy"]).toBeDefined();
    expect(elements["dividedBy"]).not.toBe(dividedByFormatter);
  });

  it("warns once when a deprecated camelCase alias formatter is used", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const svc = new FormatterService({});
    svc.register(dividedByFormatter);
    const elements = (svc as unknown as { elements: Record<string, unknown> })
      .elements;
    const legacy = elements["dividedBy"] as { read: (a: number, b: number) => number };
    expect(legacy.read(100, 10)).toBe(10);
    expect(legacy.read(100, 10)).toBe(10);
    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });
});
