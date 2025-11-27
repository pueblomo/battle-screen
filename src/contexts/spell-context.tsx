import type {Spell} from "@/lib/spell-types.ts";
import {createContext, type ReactNode, useEffect, useState} from "react";
import {apiGetSpells} from "@/service/api-service.ts";

interface SpellContextType {
    spells: Spell[]
    findSpell: (name: string) => Spell | undefined
}

const PATH = `${import.meta.env.BASE_URL}spells.json`

const SpellContext = createContext<SpellContextType>({
    spells: [],
    findSpell: () => undefined
})

const SpellProvider = ({children}: Readonly<{ children: ReactNode }>) => {
    const [spells, setSpells] = useState<Spell[]>([])

    async function loadSpells() {
        const response = await apiGetSpells(PATH)
        setSpells(response.data.spell)
    }

    function findSpell(name: string): Spell | undefined {
        return spells.find((spell) => spell.name.toLowerCase() === name.toLowerCase())
    }

    useEffect(() => {
        void loadSpells()
    }, []);

    return (
        <SpellContext.Provider value={{spells, findSpell}}>
            {children}
        </SpellContext.Provider>
    )
}

export {SpellContext, SpellProvider}