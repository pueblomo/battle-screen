import { setupCache } from "axios-cache-interceptor";
import axios from "axios";
import type { Monster } from "@/lib/monster-types.ts";
import Papa from "papaparse";
import type { Spell } from "@/lib/spell-types.ts";

export type TreasureRow = {
  dice: string;
  item: string;
};

export type RarityRow = {
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  rarity: string;
};

export type MoneyRow = {
  cr: string;
  treasure: string;
};

export type ItemEntry =
  | string
  | {
      type?: string;
      name?: string;
      caption?: string;
      entries?: ItemEntry[];
      items?: ItemEntry[];
      colLabels?: string[];
      rows?: ItemEntry[][];
    };

export type ItemDetail = {
  name: string;
  source?: string;
  rarity?: string;
  reqAttune?: boolean | string;
  type?: string;
  entries?: ItemEntry[];
};

const papaConfig = {
  header: true,
  skipEmptyLines: true,
};

const api = setupCache(axios, {
  ttl: 1000 * 60 * 60,
});

export function apiGetMonsters(path: string) {
  return api.get<{ monster: Monster[] }>(path);
}

export function apiGetSpells(path: string) {
  return api.get<{ spell: Spell[] }>(path);
}

export async function apiGetTreasureTable(
  type: string,
  rarity: string,
): Promise<TreasureRow[]> {
  const result = await api.get(
    `${import.meta.env.BASE_URL}${type}-${rarity}.csv`,
  );
  const parsed = Papa.parse<Record<string, string>>(result.data, papaConfig);
  return parsed.data.map((row) => ({
    dice: row["1d100"],
    item: row["Item"],
  }));
}

export async function apiGetItemRarityTable(): Promise<RarityRow[]> {
  const result = await api.get(`${import.meta.env.BASE_URL}item-rarity.csv`);
  const parsed = Papa.parse<Record<string, string>>(result.data, papaConfig);
  return parsed.data.map((row) => ({
    level1: row["Levels 1–4"],
    level2: row["Levels 5–10"],
    level3: row["Levels 11–16"],
    level4: row["Levels 17–20"],
    rarity: row["Item's Rarity"],
  }));
}

export async function apiGetTreasureMoneyTable(): Promise<MoneyRow[]> {
  const result = await api.get(`${import.meta.env.BASE_URL}treasure-money.csv`);
  const parsed = Papa.parse<Record<string, string>>(result.data, papaConfig);
  return parsed.data.map((row) => ({
    cr: row["CR"],
    treasure: row["Treasure"],
  }));
}

function getItemsFromPayload(payload: unknown): ItemDetail[] {
  if (typeof payload !== "object" || payload === null) return [];

  const record = payload as Record<string, unknown>;
  return ["item", "baseitem", "magicvariant"].flatMap((key) => {
    const value = record[key];
    if (!Array.isArray(value)) return [];
    return value.filter(
      (item): item is ItemDetail =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as { name?: unknown }).name === "string",
    );
  });
}

export async function apiGetItemDetails(): Promise<ItemDetail[]> {
  const itemFiles = ["items.json", "items-base.json", "magicvariants.json"];
  const itemGroups = await Promise.all(
    itemFiles.map(async (fileName) => {
      try {
        const result = await api.get(`${import.meta.env.BASE_URL}${fileName}`, {
          cache: false,
        });
        return getItemsFromPayload(result.data);
      } catch {
        return [];
      }
    }),
  );

  return itemGroups.flat();
}
