import {useContext} from "react";
import {MonsterContext} from "@/contexts/monster-context.tsx";
import StatBlock from "@/components/stat-block/stat-block.tsx";

export default function Battleground() {
    const {selectedMonsters} = useContext(MonsterContext)
    return (
        <div className="container mx-auto py-4 font-[family-name:--font-family-libre-baskerville]">
            <div className="flex flex-wrap gap-5 justify-center">
                {selectedMonsters.map((monster) => (
                    <StatBlock key={monster.name} monster={monster}/>
                ))}
            </div>
        </div>
    )
}