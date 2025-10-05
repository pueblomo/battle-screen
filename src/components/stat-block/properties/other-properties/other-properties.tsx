import type {Monster, MonsterCR, MonsterGear} from "@/lib/monster-types.ts";
import PropertyLine from "@/components/stat-block/properties/property-line.tsx";
import {calculateExperiencePoints, capitalizeFirstLetter, getProficiencyBonus} from "@/lib/utils.ts";

interface OtherPropertiesProps {
    monster: Monster
}

export default function OtherProperties({monster}: OtherPropertiesProps) {
    const {skill, senses, passive, languages, cr, resist, immune, conditionImmune, gear, vulnerable} = monster

    function getSkills(skills: Record<string, string>): string {
        return Object.entries(skills).map(([key, value]) => `${capitalizeFirstLetter(key)} ${value}`).join(", ")
    }

    function getCrDescription(checkedCr: string | MonsterCR): string {
        const crValue = typeof checkedCr === "string" ? checkedCr : checkedCr.cr
        let xp = `(XP ${calculateExperiencePoints(crValue)}`
        if (typeof checkedCr != "string" && checkedCr.xpLair) xp += `, or ${checkedCr.xpLair} in lair`
        xp += `; PB +${getProficiencyBonus(checkedCr)})`

        return `${crValue} ${xp}`
    }

    function getImmunities(immune: string[] | undefined, conImmune: string[] | undefined): string {
        let immunities = ''
        if (immune) immunities = immune.map((imm) => capitalizeFirstLetter(imm)).join(", ")
        if (immune && conImmune) immunities += "; "
        if (conImmune) immunities += conImmune.map((conIm) => capitalizeFirstLetter(conIm)).join(", ")
        return immunities
    }

    function getGear(checkedGear: (string | MonsterGear)[]): string {
        return checkedGear.map((gear) => {
            const splittedGear = typeof gear != "string" ? [...gear.item.split(" "), `(${gear.quantity})`] : gear.split(" ")
            return splittedGear.map((splitt) => capitalizeFirstLetter(splitt.split('|')[0])).join(" ")
        }).join(", ")
    }

    return (
        <div>
            {skill && <PropertyLine heading={"Skills"} description={getSkills(skill)}/>}
            {vulnerable && <PropertyLine heading={"Vulnerabilities"}
                                         description={vulnerable.map((vul) => capitalizeFirstLetter(vul)).join(", ")}/>}
            {resist && <PropertyLine heading={"Resistances"}
                                     description={resist.map((res) => capitalizeFirstLetter(res)).join(", ")}/>}
            {(immune || conditionImmune) && <PropertyLine heading={"Immunities"}
                                                          description={getImmunities(immune, conditionImmune)}/>}
            {gear &&
                <PropertyLine heading={"Gear"} description={getGear(gear)}/>}
            {senses &&
                <PropertyLine heading={"Senses"}
                              description={`${senses.map((sense) => capitalizeFirstLetter(sense)).join("; ")}; Passive Perception ${passive}`}/>
            }
            {languages && <PropertyLine heading={"Languages"}
                                        description={languages.map((language) => capitalizeFirstLetter(language)).join("; ")}/>}
            {cr && <PropertyLine heading={"CR"} description={getCrDescription(cr)}/>}
        </div>
    )
}