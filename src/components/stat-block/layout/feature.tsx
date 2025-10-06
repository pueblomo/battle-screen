import type {BaseMonsterFeature, Entry, EntryList, EntryListItem, MonsterSpellcasting} from "@/lib/monster-types.ts";
import {Fragment, type ReactNode} from "react";
import Title from "@/components/stat-block/layout/title.tsx";
import {capitalizeFirstLetter} from "@/lib/utils.ts";

interface FeatureProps {
    monsterFeatures: BaseMonsterFeature[] | undefined,
    title: string,
    spells?: MonsterSpellcasting[] | undefined,
    display?: "action" | "bonus action" | "reaction" | "trait",
    children?: ReactNode
}

function replacePlaceholdersJsx(text: string): ReactNode {
    const parts = text.split(/({@[^}]+})/g);

    return (
        <>
            {parts.map((part, i) => {
                const match = part.match(/{@([^}\s|]+)(?:\s([^}|]+))?(?:\|([^}]+))?}/);
                if (!match) {
                    // Plain text part
                    return <span key={i}>{part}</span>;
                }
                const [, key, value, extra] = match;

                switch (key) {
                    case 'dice':
                        return <Fragment key={i}>{value ?? ''}</Fragment>;
                    case 'dc':
                        return <Fragment key={i}>{`DC ${value}`}</Fragment>;
                    case 'actSave':
                        switch (value) {
                            case 'wis':
                                return <span key={i} className="italic">Wisdom Saving Throw:</span>;
                            case 'str':
                                return <span key={i} className="italic">Strength Saving Throw:</span>;
                            case 'dex':
                                return <span key={i} className="italic">Dexterity Saving Throw:</span>;
                            case 'con':
                                return <span key={i} className="italic">Constitution Saving Throw:</span>;
                            case 'int':
                                return <span key={i} className="italic">Intelligence Saving Throw:</span>;
                            case 'cha':
                                return <span key={i} className="italic">Charisma Saving Throw:</span>;
                            default:
                                return <Fragment
                                    key={i}>{`${capitalizeFirstLetter(value ?? '')} Saving Throw:`}</Fragment>;
                        }
                    case 'actSaveFail':
                        return <span key={i} className="italic">Failure:</span>
                    case 'actSaveSuccess':
                        return <span key={i} className="italic">Success:</span>;
                    case 'actSaveSuccessOrFail':
                        return <span key={i} className="italic">Failure or Success:</span>;
                    case 'condition':
                        return <Fragment key={i}>{capitalizeFirstLetter(value ?? '')}</Fragment>;
                    case 'variantrule': {
                        const presentedValue = capitalizeFirstLetter(value.split("|")[0] ?? '')
                        return <Fragment key={i}>{presentedValue.replace(/\[.*?]/g, "")}</Fragment>;
                    }
                    case 'damage':
                        return <Fragment key={i}>{value ?? ''}</Fragment>;
                    case 'atkr':
                        switch (value) {
                            case 'm':
                                return <span key={i} className="italic">Melee Attack Roll:</span>;
                            default:
                                return <span key={i} className="italic">Ranged Attack Roll:</span>;
                        }
                    case 'hit':
                        return <Fragment key={i}>{`+${value}`}</Fragment>;
                    case 'h':
                        return <span key={i} className="italic">Hit: </span>
                    case 'action':
                    case 'spell':
                    case 'status':
                        return <Fragment key={i}>{capitalizeFirstLetter(value.split("|")[0])}</Fragment>;
                    case 'hom':
                        return <span key={i} className="italic">Hit or Miss: </span>;
                    case 'recharge':
                        return <span key={i}>(Recharge {value}-6)</span>
                    default: {
                        if (key.startsWith('act')) {
                            return <span key={i} className="italic">{key.replace('act', '')}: </span>
                        }
                        return <Fragment
                            key={i}>{`{@${key}${value ? ' ' + value : ''}${extra ? '|' + extra : ''}}`}</Fragment>;
                    }
                }
            })}
        </>
    );
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
                    <span className="italic font-bold">Spellcasting.</span>
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