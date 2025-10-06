import {capitalizeFirstLetter, getMonsterType} from "@/lib/utils.ts";
import Divider from "@/components/stat-block/layout/divider.tsx";
import type {Monster} from "@/lib/monster-types.ts";

type MonsterNameProps = {
    monster: Monster
};

export default function Heading({
                                    monster
                                }: MonsterNameProps) {
    const {
        name,
        size,
        type,
        alignment, treasure
    } = monster

    function getSize(sizes: string[]): string {
        return sizes.map((size) => {
                switch (size) {
                    case "T":
                        return "Tiny"
                    case "S":
                        return "Small"
                    case "M":
                        return "Medium"
                    case "L":
                        return "Large"
                    case "H":
                        return "Huge"
                    case "G":
                        return "Gargantuan"
                    default:
                        return ""
                }
            }
        ).join("/")
    }

    function getAlignment(alignments: string[] | undefined): string | undefined {
        return alignments?.map((alignment) => {
            switch (alignment) {
                case "L":
                    return "Lawful"
                case "G":
                    return "Good"
                case "N":
                    return "Neutral"
                case "C":
                    return "Chaotic"
                case "T":
                    return "True"
                case "E":
                    return "Evil"
                case "U":
                    return "Unaligned"
                default:
                    return alignment
            }

        }).join(" ")
    }


    return (
        <div>
            <div
                className="text-red-800 text-left font-bold tracking-wider font-[family-name:--font-family-libre-baskerville] text-2xl"
                style={{fontVariant: 'small-caps'}}>
                {name}
            </div>
            <Divider/>
            <div className="italic text-left text-xs text-gray-600">
                {getSize(size)} {getMonsterType(type)}, {getAlignment(alignment)}
            </div>
            {treasure && <div className="flex gap-1 italic text-left text-xs text-gray-600">
                <p className="font-bold">Treasure:</p>
                {treasure.map((tr) => capitalizeFirstLetter(tr)).join(", ")}
            </div>}
        </div>
    )
}