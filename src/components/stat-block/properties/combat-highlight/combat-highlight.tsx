import type {
  MonsterCR,
  MonsterHP,
  MonsterSpeed,
} from "@/lib/monster-types.ts";
import PropertyLine from "@/components/stat-block/properties/property-line.tsx";
import { calculateStatBonus, getProficiencyBonus } from "@/lib/utils.tsx";

interface CombatHighlightProps {
  ac: number[];
  hp: MonsterHP;
  speed: MonsterSpeed;
  cr?: string | MonsterCR;
  initiative?: { proficiency: number };
  dex: number;
}

export default function CombatHighlight({
  ac,
  hp,
  speed,
  cr,
  initiative,
  dex,
}: CombatHighlightProps) {
  function getAc(): string {
    return ac
      .map((entry) => {
        return entry.toString();
      })
      .join(", ");
  }

  function getHp(): string {
    return `${hp.average} ${hp.formula ? `(${hp.formula})` : ""}`;
  }

  function getSpeedNumber(
    speed: number | { number: number; condition?: string },
  ): string {
    if (typeof speed === "number") return `${speed} ft.`;

    const { number, condition } = speed;
    return `${number} ft. ${condition ? `${condition}` : ""}`;
  }

  function getSpeed(): string {
    const parts: string[] = [];

    if (speed.walk) {
      parts.push(getSpeedNumber(speed.walk));
    }

    if (speed.fly !== undefined) {
      parts.push(`fly ${getSpeedNumber(speed.fly)}`);
    }

    if (speed.swim !== undefined) {
      parts.push(`swim ${getSpeedNumber(speed.swim)}`);
    }

    if (speed.climb !== undefined) {
      parts.push(`climb ${getSpeedNumber(speed.climb)}`);
    }

    if (speed.burrow !== undefined) {
      parts.push(`burrow ${getSpeedNumber(speed.burrow)}`);
    }

    if (speed.canHover) {
      parts.push("(hover)");
    }

    return parts.join(", ");
  }

  function getInitiative(): number {
    let extraPoints = 0;
    if (cr && initiative) {
      extraPoints = getProficiencyBonus(cr) * initiative.proficiency;
    }
    return calculateStatBonus(dex) + extraPoints;
  }

  return (
    <div>
      <div className="flex gap-32">
        <PropertyLine heading={"AC"} description={getAc()} />
        <PropertyLine
          heading={"Initiative"}
          description={`${getInitiative() < 0 ? getInitiative() : "+" + getInitiative()}`}
        />
      </div>
      <PropertyLine heading={"HP"} description={getHp()} />
      <PropertyLine heading={"Speed"} description={getSpeed()} />
    </div>
  );
}
