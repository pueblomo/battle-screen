import { SpellContext } from "@/contexts/spell-context";
import type { Spell } from "@/lib/spell-types";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";
import SpellDescription from "../layout/spell-description";

const mockSpell: Spell = {
  name: "Fireball",
  source: "PHB",
  page: 241,
  level: 3,
  school: "evocation",
  time: [{ number: 1, unit: "action" }],
  range: { type: "point", distance: { type: "feet", amount: 150 } },
  components: { v: true, s: true, m: "a tiny ball of bat guano" },
  duration: [{ type: "instant" }],
  entries: ["A bright streak flashes from your finger..."],
};

function renderWithContext(
  ui: ReactElement,
  findSpellReturn: Spell | undefined = mockSpell,
) {
  return render(
    <SpellContext.Provider
      value={{
        spells: [findSpellReturn],
        findSpell: vi.fn(() => findSpellReturn),
      }}
    >
      {ui}
    </SpellContext.Provider>,
  );
}

describe("SpellDescriptopn", () => {
  it("renders spell name as plain text when spell not found", () => {
    renderWithContext(<SpellDescription name="Unknown Spell" />, undefined);
    expect(screen.getByText("Unknown Spell")).toBeInTheDocument();
  });

  it("renders spell name as clickable when spell is found", () => {
    renderWithContext(<SpellDescription name="Fireball" />);
    const trigger = screen.getByText("Fireball");
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveClass("text-red-800", "underline");
  });

  it("shows popover with spell details on click", async () => {
    const user = userEvent.setup();
    renderWithContext(<SpellDescription name="Fireball" />);

    await user.click(screen.getByText("Fireball"));

    expect(screen.getByText("Level 3")).toBeInTheDocument();
    expect(screen.getByText("Casting Time:")).toBeInTheDocument();
    expect(screen.getByText("Range:")).toBeInTheDocument();
  });
});
