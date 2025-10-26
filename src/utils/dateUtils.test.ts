import { describe, it, expect, vi, afterAll, beforeAll } from "vitest";
import { formatDate, calculateAge, formatRuntime, DATE_FORMATS } from "./dateUtils";

describe("formatDate", () => {
  it("should format a valid date string with default options", () => {
    const date = "2025-10-26";
    const result = formatDate(date);

    expect(result).toContain("October");
    expect(result).toContain("26");
    expect(result).toContain("2025");
  });

  it("should return only the year when year format is provider", () => {
    const date = "2025-10-26";
    const result = formatDate(date, DATE_FORMATS.year);

    expect(result).toBe("2025");
  });

  it("should format the date according to the scecified locale", () => {
    const date = "2025-10-26";
    const result = formatDate(date, DATE_FORMATS.full, "pl-PL");

    expect(result).toBe("26 października 2025");
  });

  it("should return 'N/A' for null or undefined date", () => {
    expect(formatDate(null)).toBe("N/A");
    expect(formatDate(undefined)).toBe("N/A");
  });

  it('should return "Invalid Date" for a malformed date string', () => {
    expect(formatDate("not-a-date")).toBe("Invalid Date!");
  });
});

describe("calculateAge", () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-10-26"));
  });

  afterAll(() => vi.useRealTimers());

  it("should correctly calculate age for a person who already had a birthday this year", () => {
    const birtday = "1999-01-01";
    const age = calculateAge(birtday);

    expect(age).toBe(26);
  });

  it("should correctly calculate age for a person who has not had a birthday this year", () => {
    const birtday = "1999-12-12";
    const age = calculateAge(birtday);

    expect(age).toBe(25);
  });

  it("should correctly calculate age when birthday is today", () => {
    const birtday = "1999-10-26";
    const age = calculateAge(birtday);

    expect(age).toBe(26);
  });

  it("should return null for invalid or missing birthday", () => {
    expect(calculateAge(null)).toBeNull();
    expect(calculateAge(undefined)).toBeNull();
    expect(calculateAge("not-a-date")).toBeNull();
  });
});

describe("formatRuntime", () => {
  it("should correctly format runtime in hours and minutes", () => {
    const runtime = 150;
    const formatted = formatRuntime(runtime);

    expect(formatted).toBe("2h 30m");
  });

  it("should correctly format runtime for less than an hour", () => {
    const runtime = 30;
    const formatted = formatRuntime(runtime);

    expect(formatted).toBe("0h 30m");
  });

  it("should return an empty string for 0 or falsy input", () => {
    expect(formatRuntime(0)).toBe("");
  });
});
