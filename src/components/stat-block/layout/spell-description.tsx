import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Fragment, type ReactNode, useContext, useEffect, useState} from "react";
import {SpellContext} from "@/contexts/spell-context.tsx";
import type {Spell, SpellEntry, SpellRange, SpellTime} from "@/lib/spell-types.ts";
import {replacePlaceholdersJsx} from "@/lib/utils.tsx";

interface SpellDescriptionProps {
    name: string
}

function styleTime(time: SpellTime): ReactNode {
    let text = ''
    switch (time.unit) {
        case "action":
            text = "Action"
            break
        case "bonus":
            text = "Bonus Action"
            break
        case "reaction":
            text = "Reaction"
            break
        case "minute":
            text = `${time.number} minute`
            break
        case "hour":
            text = `${time.number} hour`
            break
    }

    if (time.condition) {
        text += `, ${time.condition}`
    }

    return replacePlaceholdersJsx(text)
}

function styleRange(spellRange: SpellRange): ReactNode {
    let text = ""
    if (spellRange.distance?.amount) {
        text = `${spellRange.distance.amount} ${spellRange.distance.type}`
    } else {
        text = "Self"
    }

    return replacePlaceholdersJsx(text)
}

function styleEntry(entry: (string | SpellEntry)): ReactNode {
    if (typeof entry === "string") return <span>{replacePlaceholdersJsx(entry)}</span>

    return (
        <>
            {entry.items?.map((item) => (
                <p className="pl-6 indent-[-1.5rem]"><span
                    className="font-bold">{item.name}.</span> {item.entries?.map((mappedEntry) => styleEntry(mappedEntry))}
                </p>
            ))}
            {entry.entries && (
                <p className="pl-6 indent-[-1.5rem]">
                    <span
                        className="font-bold italic">{entry.name}.</span> {entry.entries?.map((mappedEntry) => styleEntry(mappedEntry))}
                </p>
            )}
        </>
    )
}

export default function SpellDescription({name}: SpellDescriptionProps) {
    const {findSpell} = useContext(SpellContext)
    const [spell, setSpell] = useState<Spell | undefined>()

    useEffect(() => {
        const response = findSpell(name)
        setSpell(response)
    }, [name, findSpell]);

    if (!spell) return <Fragment>{name}</Fragment>

    return (
        <Popover>
            <PopoverTrigger>
                <span
                    className="text-red-800 underline font-[family-name:--font-family-libre-baskerville]">{name}</span>
            </PopoverTrigger>
            <PopoverContent
                className="bg-[url('/statblockparch.jpg')] drop-shadow-lg shadow-gray-700 text-xs border-4 border-orange-200 font-[family-name:--font-family-libre-baskerville]">
                <p className="font-bold text-sm text-red-800">{name}</p>
                <p className="italic text-xs">Level {spell.level}</p>
                <p><span className="font-bold">Casting Time:</span> {styleTime(spell.time[0])}</p>
                <p><span className="font-bold">Range:</span> {styleRange(spell.range)}</p>
                <br/>
                {spell.entries.map((entry) => <div key={entry.toString()}>{styleEntry(entry)}</div>)}
                <br/>
                {spell.entriesHigherLevel?.map((entry) => <div key={entry.toString()}>{styleEntry(entry)}</div>)}
            </PopoverContent>
        </Popover>
    )
}