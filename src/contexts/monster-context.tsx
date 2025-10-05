import {createContext, type ReactNode, useEffect, useState} from "react";
import type {Monster} from "../lib/monster-types.ts";
import axios from "axios";

interface MonsterContextType {
    monsters: Monster[],
    selectedMonsters: Monster[],
    clearSelectedMonsters: () => void,
    addMonster: (monster: Monster) => void
}

const PATHS = [
    "/bestiary-mm.json",
    "/bestiary-dm.json",
    "/bestiary-mordekai-presents.json"
]

const MonsterContext = createContext<MonsterContextType>({
    monsters: [],
    selectedMonsters: [],
    clearSelectedMonsters: () => {
    },
    addMonster: () => {
    }
})

const MonsterProvider = ({children}: Readonly<{ children: ReactNode }>) => {
    const [monsters, setMonsters] = useState<Monster[]>([])
    const [selectedMonsters, setSelectedMonsters] = useState<Monster[]>([])

    function clearSelectedMonsters() {
        setSelectedMonsters([])
    }

    function addMonster(monster: Monster) {
        if (!selectedMonsters.some(m => m.name === monster.name)) {
            setSelectedMonsters((prevState) => [...prevState, monster])
        }
    }

    function loadMonsters() {
        Promise.all(PATHS.map(async (path) => {
            const response = await axios.get<{ monster: Monster[] }>(path)
            return response.data.monster
        })).then((monsters) => {
            setMonsters(monsters.flat())
        })
    }

    useEffect(() => {
        loadMonsters()
    }, [])

    return (
        <MonsterContext.Provider value={{monsters, selectedMonsters, addMonster, clearSelectedMonsters}}>
            {children}
        </MonsterContext.Provider>
    )
}

export {MonsterContext, MonsterProvider}