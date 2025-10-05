import {getMonsterType} from "@/lib/utils.ts";

type MonsterNameProps = {
    name: string;
    size: string[];
    type: string | { type: string | { choose: string[] }; tags?: string[] };
    alignment: string[] | undefined;
};

export default function Heading({
                                    name,
                                    size,
                                    type,
                                    alignment
                                }: MonsterNameProps) {

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
                default:
                    return ""
            }

        }).join(" ")
    }


    return (
        <div className="">
            <div
                className="text-red-800 text-left font-bold tracking-wider font-[family-name:--font-family-libre-baskerville] text-xl"
                style={{fontVariant: 'small-caps'}}>
                {name}
            </div>
            <div className="italic text-left text-xs text-gray-600">
                {getSize(size)} {getMonsterType(type)}, {getAlignment(alignment)}
            </div>
        </div>
    )
}