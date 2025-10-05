import type {Monster} from "@/lib/monster-types.ts";
import Heading from "@/components/stat-block/heading/heading.tsx";
import Properties from "@/components/stat-block/properties/properties.tsx";
import Title from "@/components/stat-block/layout/title.tsx";

interface StatBlockProps {
    monster: Monster
}

export default function StatBlock({monster}: StatBlockProps) {
    return (
        <div className="inline-block min-w-[400px] max-w-[400px] rounded-lg">
            <div className="bg-[url('statblockparch.jpg')] px-2.5 py-5 rounded-lg border-4 border-orange-200">
                <div className="grid gap-2">
                    <Heading monster={monster}/>
                    <Properties monster={monster}/>
                    <Title text={"Traits"}/>
                    <Title text={"Actions"}/>
                    <Title text={"Bonus Actions"}/>
                    <Title text={"Reactions"}/>
                    <Title text={"Legendary Actions"}/>
                </div>
            </div>
        </div>
    )
}