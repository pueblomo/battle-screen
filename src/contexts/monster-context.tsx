import {createContext, type ReactNode, useEffect, useState} from "react";
import type {Monster} from "../lib/monster-types.ts";
import {apiGetMonsters} from "@/service/api-service.ts";

interface MonsterContextType {
    monsters: Monster[],
    selectedMonsters: Monster[],
    clearSelectedMonsters: () => void,
    setSelectedMonsters: (monster: Monster[]) => void
}

const PATHS = [
    "/bestiary-mm.json",
]

const MonsterContext = createContext<MonsterContextType>({
    monsters: [],
    selectedMonsters: [],
    clearSelectedMonsters: () => {
    },
    setSelectedMonsters: () => {
    }
})

const MonsterProvider = ({children}: Readonly<{ children: ReactNode }>) => {
    const [monsters, setMonsters] = useState<Monster[]>([])
    const [selectedMonsters, setSelectedMonsters] = useState<Monster[]>([])

    function clearSelectedMonsters() {
        setSelectedMonsters([])
    }

    function loadMonsters() {
        Promise.all(PATHS.map(async (path) => {
            const response = await apiGetMonsters(path)
            return response.data.monster
        })).then((monsters) => {
            setMonsters(monsters.flat())
        })
    }

    useEffect(() => {
        loadMonsters()
    }, [])

    return (
        <MonsterContext.Provider value={{monsters, selectedMonsters, setSelectedMonsters, clearSelectedMonsters}}>
            {children}
        </MonsterContext.Provider>
    )
}

export {MonsterContext, MonsterProvider}