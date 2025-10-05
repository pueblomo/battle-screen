import {useContext} from "react";
import {MonsterContext} from "@/contexts/monster-context.tsx";
import StatBlock from "@/components/pages/battleground/stat-block.tsx";

export default function Battleground() {
    const {selectedMonsters} = useContext(MonsterContext)
    return (
        <div className="container mx-auto py-4">
            <div className="flex flex-wrap gap-5 justify-center">
                {selectedMonsters.map((monster) => (
                    <StatBlock key={monster.name} monster={monster}/>
                ))}
            </div>
        </div>
    )
}