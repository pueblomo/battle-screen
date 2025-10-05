import ModSaveLine from "@/components/pages/battleground/mod-save-line.tsx";
import ScoreLine from "@/components/pages/battleground/score-line.tsx";

interface ScoreProps {
    str: number,
    dex: number,
    con: number,
    int: number,
    wis: number,
    cha: number,
    save?: Record<string, string>
}

export default function Score({str, dex, con, int, wis, cha, save}: ScoreProps) {

    return (
        <div className="grid grid-cols-3 my-2">
            <div>
                <ModSaveLine/>
                <ScoreLine stat={"Str"} score={str} save={save ? save["str"] : undefined}/>
                <ScoreLine stat={"Int"} score={int} save={save ? save["int"] : undefined}/>
            </div>
            <div>
                <ModSaveLine/>
                <ScoreLine stat={"Dex"} score={dex} save={save ? save["dex"] : undefined}/>
                <ScoreLine stat={"Wis"} score={wis} save={save ? save["wis"] : undefined}/>
            </div>
            <div>
                <ModSaveLine/>
                <ScoreLine stat={"Con"} score={con} save={save ? save["con"] : undefined}/>
                <ScoreLine stat={"Cha"} score={cha} save={save ? save["cha"] : undefined}/>
            </div>
        </div>
    )

}