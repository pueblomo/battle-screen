import type {BaseMonsterFeature, Entry, EntryList, EntryListItem, MonsterSpellcasting} from "@/lib/monster-types.ts";
import {Fragment, type ReactNode} from "react";
import Title from "@/components/stat-block/layout/title.tsx";
import {replacePlaceholdersJsx} from "@/lib/utils.tsx";

interface FeatureProps {
    monsterFeatures: BaseMonsterFeature[] | undefined,
    title: string,
    spells?: MonsterSpellcasting[] | undefined,
    display?: "action" | "bonus" | "reaction" | "trait" | "legendary",
    children?: ReactNode
}

function isEntryList(entry: Entry): entry is EntryList {
    return typeof entry === "object" && entry !== null && entry.type === "list" && Array.isArray(entry.items);
}

function isEntryListItem(entry: Entry): entry is EntryListItem {
    return typeof entry === "object" && entry !== null && entry.type === "item" && Array.isArray(entry.entries);
}


export default function Feature({title, children, monsterFeatures, spells, display}: FeatureProps) {
    const filteredSpells: MonsterSpellcasting[] | undefined = spells?.filter((spell) => spell.displayAs === display)

    function styleEntry(entry: Entry, index: number): ReactNode {
        if (typeof entry === "string") return <span key={index}> {replacePlaceholdersJsx(entry)}</span>
        if (isEntryList(entry)) return (
            <div className="pt-2" key={index}>
                {entry.items.map((item, i) => styleEntryListItem(item, i))}
            </div>
        )
        if (isEntryListItem(entry)) return <Fragment key={index}>{styleEntryListItem(entry)}</Fragment>
    }

    function styleEntryListItem(entryListItem: EntryListItem, index?: number): ReactNode {
        return (
            <div key={entryListItem.name ?? index} className="pl-6 indent-[-1.5rem]">
                {entryListItem.name && <span className="font-bold">{entryListItem.name}.</span>}
                {entryListItem.entries.map((entry, i) => styleEntry(entry, i))}
            </div>
        )
    }

    function styleMonsterFeature(monsterFeature: BaseMonsterFeature): ReactNode {
        return (
            <div key={monsterFeature.name} className="text-xs text-left text-black">
                <span className="italic font-bold">{replacePlaceholdersJsx(monsterFeature.name)}.</span>
                {monsterFeature.entries.map((entry, i) => styleEntry(entry, i))}
            </div>
        )
    }

    function styleAtWill(willSpells: string[]): ReactNode {
        return (
            <>
                <span className="font-bold">At Will: </span>
                {willSpells.map((spell, index) => (
                        <Fragment key={index}>
                            {replacePlaceholdersJsx(spell)}
                            {index < willSpells.length - 1 ? ', ' : ''}
                        </Fragment>
                    )
                )
                }
            </>
        )
    }

    function styleDaily(dailySpells: Record<string, string[]>): ReactNode {
        return (
            <div>
                {Object.entries(dailySpells).map(([key, values]) => (
                    <div key={key}>
                        <span className="font-bold">{key.charAt(0)}/Day Each: </span>
                        {values.map((spell, index) => (
                            <Fragment key={index}>
                                {replacePlaceholdersJsx(spell)}
                                {index < values.length - 1 ? ', ' : ''}
                            </Fragment>
                        ))
                        }
                    </div>
                ))}
            </div>
        )
    }

    function styleSpell(monsterSpellCasting: MonsterSpellcasting, key: number): ReactNode {
        return (
            <div className="grid gap-2 text-xs text-left text-black pt-2">
                <div>
                    <span className="italic font-bold">{replacePlaceholdersJsx(monsterSpellCasting.name)}.</span>
                    <span> {styleEntry(monsterSpellCasting.headerEntries[0], key)}</span>
                </div>
                <div className="pl-6 indent-[-1.5rem]">
                    {monsterSpellCasting.will && styleAtWill(monsterSpellCasting.will)}
                    {monsterSpellCasting.daily && styleDaily(monsterSpellCasting.daily)}
                </div>
            </div>
        )
    }

    if (!monsterFeatures) {
        if (!filteredSpells || filteredSpells.length <= 0) return <></>
    }

    return (
        <div>
            <Title text={title}/>
            {children}
            {monsterFeatures && (
                <div className="grid gap-2">
                    {monsterFeatures.map((feature) => (
                        <Fragment key={feature.name}>{styleMonsterFeature(feature)}</Fragment>
                    ))}
                </div>
            )}
            {filteredSpells && (
                <div className="grid gap-2">
                    {filteredSpells.map((spell, i) => (
                        <Fragment key={spell.name ?? i}>{styleSpell(spell, i)}</Fragment>
                    ))}
                </div>
            )}
        </div>
    )
}