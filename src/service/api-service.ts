import {setupCache} from "axios-cache-interceptor";
import axios from "axios";
import type {Monster} from "@/lib/monster-types.ts";
import Papa from "papaparse"
import type {Spell} from "@/lib/spell-types.ts";

export type TreasureRow = {
    dice: string,
    item: string
}

export type RarityRow = {
    level1: string,
    level2: string,
    level3: string,
    level4: string,
    rarity: string
}

const papaConfig = {
    header: true,
    skipEmptyLines: true
}

const api = setupCache(axios, {
    ttl: 1000 * 60 * 60
})

export function apiGetMonsters(path: string) {
    return api.get<{ monster: Monster[] }>(path)
}

export function apiGetSpells(path: string) {
    return api.get<{ spell: Spell[] }>(path)
}

export async function apiGetTreasureTable(type: string, rarity: string): Promise<TreasureRow[]> {
    const result = await api.get(`/${type}-${rarity}.csv`)
    const parsed = Papa.parse<Record<string, string>>(result.data, papaConfig)
    return parsed.data.map((row) => (
        {
            dice: row["1d100"],
            item: row["Item"]
        }
    ))
}

export async function getItemRarityTable(): Promise<RarityRow[]> {
    const result = await api.get("/item-rarity.csv")
    const parsed = Papa.parse<Record<string, string>>(result.data, papaConfig)
    return parsed.data.map((row) =>
        ({
            level1: row['Levels 1–4'],
            level2: row['Levels 5–10'],
            level3: row['Levels 11–16'],
            level4: row['Levels 17–20'],
            rarity: row["Item's Rarity"]
        })
    )
}