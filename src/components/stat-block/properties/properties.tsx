import type {Monster} from "@/lib/monster-types.ts";
import CombatHighlight from "@/components/stat-block/properties/combat-highlight/combat-highlight.tsx";
import Score from "@/components/stat-block/properties/score/score.tsx";
import OtherProperties from "@/components/stat-block/properties/other-properties/other-properties.tsx";

interface PropertiesProps {
    monster: Monster
}

export default function Properties({monster}: PropertiesProps) {
    const {ac, hp, speed, dex, initiative, cr} = monster


    return (
        <div>
            <CombatHighlight ac={ac} hp={hp} speed={speed} dex={dex} cr={cr} initiative={initiative}/>
            <Score monster={monster}/>
            <OtherProperties monster={monster}/>
        </div>
    )
}