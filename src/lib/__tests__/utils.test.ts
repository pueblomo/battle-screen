import { describe, it, expect } from "vitest";
import {
  calculateExperiencePoints,
  calculateStatBonus,
  capitalizeFirstLetter,
  getMonsterType,
  getProficiencyBonus,
} from "../utils";

describe("getMonsterType", () => {
  it("returns string type directly", () => {
    expect(getMonsterType("dragon")).toBe("dragon");
  });

  it("returns type from object", () => {
    expect(getMonsterType({ type: "humanoid" })).toBe("humanoid");
  });

  it("joins choose option", () => {
    expect(getMonsterType({ type: { choose: ["elf", "human"] } })).toBe(
      "elf or human",
    );
  });
});

describe("getProficiencyBonus", () => {
  it("returns 2 for fractional CRs", () => {
    expect(getProficiencyBonus("1/8")).toBe(2);
    expect(getProficiencyBonus("1/2")).toBe(2);
  });

  it("returns correct bonus for integer CRs", () => {
    expect(getProficiencyBonus("1")).toBe(2);
    expect(getProficiencyBonus("5")).toBe(3);
    expect(getProficiencyBonus("10")).toBe(4);
    expect(getProficiencyBonus("14")).toBe(5);
    expect(getProficiencyBonus("18")).toBe(6);
    expect(getProficiencyBonus("22")).toBe(7);
    expect(getProficiencyBonus("26")).toBe(8);
    expect(getProficiencyBonus("30")).toBe(9);
  });

  it("handles MonsterCR object format", () => {
    expect(getProficiencyBonus({ cr: "10" })).toBe(4);
  });
});

describe("calculateStatBonus", () => {
  it("returns correct modifiers", () => {
    expect(calculateStatBonus(3)).toBe(-4);
    expect(calculateStatBonus(8)).toBe(-1);
    expect(calculateStatBonus(10)).toBe(0);
    expect(calculateStatBonus(14)).toBe(2);
    expect(calculateStatBonus(18)).toBe(4);
    expect(calculateStatBonus(20)).toBe(5);
  });
});

describe("capitalizeFirstLetter", () => {
  it("capitalizes first letter", () => {
    expect(capitalizeFirstLetter("hello")).toBe("Hello");
    expect(capitalizeFirstLetter("WORLD")).toBe("WORLD");
  });
});

describe("calculateExperiencePoints", () => {
  it("handles fractional CRs", () => {
    expect(calculateExperiencePoints("1/8")).toBe("25");
    expect(calculateExperiencePoints("1/4")).toBe("50");
    expect(calculateExperiencePoints("1/2")).toBe("100");
  });

  it("handles integer CRs", () => {
    expect(calculateExperiencePoints("1")).toBe("200");
    expect(calculateExperiencePoints("10")).toBe("5900");
    expect(calculateExperiencePoints("20")).toBe("25000");
  });
});
