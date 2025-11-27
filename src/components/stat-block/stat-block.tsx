import type {Monster} from "@/lib/monster-types.ts";
import Heading from "@/components/stat-block/heading/heading.tsx";
import Properties from "@/components/stat-block/properties/properties.tsx";
import Feature from "@/components/stat-block/layout/feature.tsx";

interface StatBlockProps {
    monster: Monster
}

export default function StatBlock({monster}: StatBlockProps) {
    return (
        <div className="inline-block min-w-[400px] max-w-[400px] rounded-lg">
            <div
                style={{backgroundImage: `url('${import.meta.env.BASE_URL}statblockparch.jpg')`}}
                className="px-2.5 py-5 rounded-lg border-4 border-orange-200 drop-shadow-lg">
                <div className="grid gap-2">
                    <Heading monster={monster}/>
                    <Properties monster={monster}/>
                    {(monster.trait || monster.spellcasting) && (
                        <Feature monsterFeatures={monster.trait} title={"Traits"} spells={monster.spellcasting}
                                 display={"trait"}/>
                    )}
                    {(monster.action || monster.spellcasting) && (
                        <Feature monsterFeatures={monster.action} title={"Actions"} spells={monster.spellcasting}
                                 display={"action"}/>
                    )}
                    {(monster.bonus || monster.spellcasting) && (
                        <Feature monsterFeatures={monster.bonus} title={"Bonus Actions"} spells={monster.spellcasting}
                                 display={"bonus action"}/>
                    )}
                    {(monster.reaction || monster.spellcasting) && (
                        <Feature monsterFeatures={monster.reaction} title={"Reactions"} spells={monster.spellcasting}
                                 display={"reaction"}/>
                    )}
                    {monster.legendary && (
                        <Feature monsterFeatures={monster.legendary} title={"Legendary Actions"}>
                            <div
                                className="italic text-gray-600 text-xs text-left mb-2">Legendary Action Uses:
                                3 {monster.legendaryActionsLair ? `(${monster.legendaryActionsLair} in Lair)` : ``}.
                                Immediately after another creature's turn, the {monster.name} can expend a use to take
                                one of the following actions.
                                The {monster.name} regains all expended uses at the start of each of its turns.
                            </div>
                        </Feature>
                    )}
                </div>
            </div>
        </div>
    )
}