import type {MonsterAC, MonsterCR, MonsterHP, MonsterSpeed} from "@/lib/monster-types.ts";
import PropertyLine from "@/components/stat-block/properties/property-line.tsx";
import {calculateStatBonus, getProficiencyBonus} from "@/lib/utils.ts";

interface CombatHighlightProps {
    ac: (number | MonsterAC)[],
    hp: MonsterHP,
    speed: MonsterSpeed,
    cr?: string | MonsterCR,
    initiative?: { proficiency: number },
    dex: number
}

export default function CombatHighlight({ac, hp, speed, cr, initiative, dex}: CombatHighlightProps) {

    function getAc(): string {
        return ac
            .map((entry) => {
                if (typeof entry === "number") {
                    return entry.toString();
                } else {
                    return entry.from && entry.from.length > 0
                        ? `${entry.ac} (${entry.from.join(", ")})`
                        : `${entry.ac}`;
                }
            })
            .join(", ");
    }

    function getHp(): string {
        return `${hp.average} ${hp.formula ? `(${hp.formula})` : ''}`
    }

    function getSpeed(): string {
        const parts: string[] = []

        if (speed.walk) {
            parts.push(`${speed.walk} ft.`)
        }

        if (speed.fly !== undefined) {
            if (typeof speed.fly === "number") {
                parts.push(`fly ${speed.fly} ft.${speed.canHover ? " (hover)" : ""}`);
            } else {
                const {number, condition} = speed.fly;
                parts.push(
                    `fly ${number} ft.${condition ? ` ${condition}` : ""}${
                        speed.canHover ? " (hover)" : ""
                    }`
                );
            }
        }

        if (speed.swim !== undefined) {
            parts.push(`swim ${speed.swim} ft.`);
        }

        if (speed.climb !== undefined) {
            parts.push(`climb ${speed.climb} ft.`);
        }

        if (speed.burrow !== undefined) {
            parts.push(`burrow ${speed.burrow} ft.`);
        }

        return parts.join(", ")
    }

    function getInitiative(): number {
        let extraPoints = 0
        if (cr && initiative) {
            extraPoints = getProficiencyBonus(cr) * initiative.proficiency
        }
        return calculateStatBonus(dex) + extraPoints
    }

    return (
        <div>
            <div className="flex gap-32">
                <PropertyLine heading={"AC"} description={getAc()}/>
                <PropertyLine heading={"Initiative"}
                              description={`${getInitiative() < 0 ? getInitiative() : "+" + getInitiative()}`}/>
            </div>
            <PropertyLine heading={"HP"} description={getHp()}/>
            <PropertyLine heading={"Speed"} description={getSpeed()}/>


        </div>
    )
}