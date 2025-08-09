import { describe, it, expect } from "vitest";
import {
  formatDateSomali, formatTimeSomali, formatDateTimeSomali, formatRelativeSomali
} from "../src/index.js";

describe("somali-date", () => {
  it("formats a date (long)", () => {
    const s = formatDateSomali(new Date("2025-08-14T10:00:00Z"), { weekday: "long", month: "long" });
    expect(s.includes("Agoosto")).toBe(true);
  });

  it("formats time 24h", () => {
    const s = formatTimeSomali(new Date("2025-08-14T07:05:09Z"));
    expect(/\d{2}:\d{2}/.test(s)).toBe(true);
  });

  it("formats datetime", () => {
    const s = formatDateTimeSomali(new Date("2025-08-14T07:05:09Z"));
    expect(s).toMatch(/ \d{2}:\d{2}$/);
  });

  it("relative wording", () => {
    const today = new Date();
    expect(formatRelativeSomali(today)).toBe("maanta");
  });
});
