import type {Monster} from "@/lib/monster-types.ts";
import Heading from "@/components/pages/battleground/heading.tsx";
import Divider from "@/components/pages/battleground/divider.tsx";
import BaseProperties from "@/components/pages/battleground/base-properties.tsx";
import Score from "@/components/pages/battleground/score.tsx";

interface StatBlockProps {
    monster: Monster
}

export default function StatBlock({monster}: StatBlockProps) {
    return (
        <div className="inline-block shadow-lg min-w-[400px]">
            <div className="bg-[url('statblockparch.jpg')] px-2.5 py-5">
                <Heading name={monster.name} size={monster.size} type={monster.type} alignment={monster.alignment}/>
                <Divider/>
                <BaseProperties ac={monster.ac} hp={monster.hp} speed={monster.speed} cr={monster.cr}
                                initiative={monster.initiative} dex={monster.dex}/>
                <Score str={monster.str} dex={monster.dex} con={monster.con} int={monster.int} wis={monster.wis}
                       cha={monster.cha}
                       save={monster.save}/>
                <Divider/>
            </div>
        </div>
    )
}