import {calculateStatBonus} from "@/lib/utils.tsx";

interface ScoreLineProp {
    stat: string,
    score: number,
    save?: string
}

export default function ScoreLine({stat, score, save}: ScoreLineProp) {
    return (
        <div className="grid grid-cols-4 text-sm text-red-800 font-[family-name:--font-family-libre-baskerville]">
            <div
                className="font-bold tracking-wider bg-red-100"
                style={{fontVariant: 'small-caps'}}>
                {stat}
            </div>
            <div className="bg-red-100">
                {score}
            </div>
            <div className="bg-amber-100">
                {calculateStatBonus(score) >= 0 ? `+${calculateStatBonus(score)}` : calculateStatBonus(score)}
            </div>
            {save ? (
                <div className="bg-amber-100">
                    {save}
                </div>
            ) : (
                <div className="bg-amber-100">
                    {calculateStatBonus(score) >= 0 ? `+${calculateStatBonus(score)}` : calculateStatBonus(score)}
                </div>
            )}
        </div>
    )
}