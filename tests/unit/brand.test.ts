import { describe, expect, it } from "vitest";
import { BRANDS, DEFAULT_BRAND, isBrand, resolveBrand } from "../../src/lib/brand";

describe("brand directions", () => {
  it("offers exactly Evolve and Sunday Sessions, Evolve first", () => {
    expect(BRANDS.map((b) => b.label)).toEqual(["Evolve", "Sunday Sessions"]);
    expect(DEFAULT_BRAND).toBe("evolve");
  });

  it("recognises only known brand ids", () => {
    expect(isBrand("sunday")).toBe(true);
    expect(isBrand("range")).toBe(false);
    expect(isBrand(null)).toBe(false);
  });

  it("prefers the URL, then the saved choice, then the default", () => {
    expect(resolveBrand("sunday", "evolve")).toBe("sunday");
    expect(resolveBrand(null, "sunday")).toBe("sunday");
    expect(resolveBrand("nope", "also-nope")).toBe("evolve");
    expect(resolveBrand(null, null)).toBe("evolve");
  });
});
