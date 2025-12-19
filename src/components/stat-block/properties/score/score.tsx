import ModSaveLine from "@/components/stat-block/properties/score/mod-save-line.tsx";
import ScoreLine from "@/components/stat-block/properties/score/score-line.tsx";
import type { Monster } from "@/lib/monster-types.ts";

interface ScoreProps {
  monster: Monster;
}

export default function Score({ monster }: ScoreProps) {
  const { str, dex, con, int, wis, cha, save } = monster;
  return (
    <div className="grid grid-cols-3 my-2">
      <div>
        <ModSaveLine />
        <ScoreLine
          stat={"Str"}
          score={str}
          save={save ? save["str"] : undefined}
        />
        <ScoreLine
          stat={"Int"}
          score={int}
          save={save ? save["int"] : undefined}
        />
      </div>
      <div>
        <ModSaveLine />
        <ScoreLine
          stat={"Dex"}
          score={dex}
          save={save ? save["dex"] : undefined}
        />
        <ScoreLine
          stat={"Wis"}
          score={wis}
          save={save ? save["wis"] : undefined}
        />
      </div>
      <div>
        <ModSaveLine />
        <ScoreLine
          stat={"Con"}
          score={con}
          save={save ? save["con"] : undefined}
        />
        <ScoreLine
          stat={"Cha"}
          score={cha}
          save={save ? save["cha"] : undefined}
        />
      </div>
    </div>
  );
}
