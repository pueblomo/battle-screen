// D&D 5e size categories
type MonsterSize = "T" | "S" | "M" | "L" | "H" | "G";

// D&D 5e alignment components
type AlignmentComponent = "L" | "N" | "C" | "G" | "E" | "U";

// Monster type can be simple string or object with tags
type MonsterType = string | {
    type: string;
    tags?: string[];
};

export interface Monster {
    name: string;
    source: string;
    page: number;
    size: MonsterSize[];
    type: MonsterType;
    alignment?: AlignmentComponent[];
    ac: number[];
    hp: MonsterHP;
    speed: MonsterSpeed;
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
    save?: Record<string, string>;
    skill?: Record<string, string>;
    senses?: string[];
    passive?: number;
    languages?: string[];
    cr?: string | MonsterCR;
    trait?: BaseMonsterFeature[];
    action?: BaseMonsterFeature[];
    legendary?: BaseMonsterFeature[];
    bonus?: BaseMonsterFeature[];
    reaction?: BaseMonsterFeature[];
    legendaryActionsLair?: number;
    legendaryGroup?: { name: string; source: string };
    spellcasting?: MonsterSpellcasting[];
    environment?: string[];
    treasure?: string[];
    gear?: (string | MonsterGear)[];
    vulnerable?: string[];
    resist?: string[];
    immune?: string[];
    conditionImmune?: string[];
    pbNote?: string;
    familiar?: boolean;
    initiative?: { proficiency: number };
    soundClip?: { type: string; path: string };
    hasToken?: boolean;
    hasFluff?: boolean;
    hasFluffImages?: boolean;
    srd52?: boolean;
    basicRules2024?: boolean;

    // Tags
    traitTags?: string[];
    senseTags?: string[];
    actionTags?: string[];
    languageTags?: string[];
    damageTags?: string[];
    damageTagsSpell?: string[];
    spellcastingTags?: string[];
    miscTags?: string[];
    conditionInflict?: string[];
    conditionInflictSpell?: string[];
    savingThrowForced?: string[];
    savingThrowForcedSpell?: string[];
    savingThrowForcedLegendary?: string[];
    dragonAge?: string;
}

export interface MonsterCR {
    cr: string;
    xpLair?: number
}


export interface MonsterGear {
    item: string,
    quantity: number
}

// Removed MonsterAC interface as AC is always just an array of numbers in the actual data

export interface MonsterHP {
    average?: number;
    formula?: string;
    special?: string;
}

export interface MonsterSpeed {
    walk?: number | { number: number; condition?: string };
    fly?: number | { number: number; condition?: string };
    swim?: number | { number: number; condition?: string };
    climb?: number | { number: number; condition?: string };
    burrow?: number | { number: number; condition?: string };
    canHover?: boolean;
}

// Recursive type definitions for monster feature entries
export type Entry = string | EntryList | EntryListItem;

export interface EntryList {
    type: "list";
    style?: string;
    items: EntryListItem[];
}

export interface EntryListItem {
    type: "item";
    name?: string;
    entries: Entry[];
}

// Base interface for all monster features
export interface BaseMonsterFeature {
    name: string;
    entries: Entry[];
}

export interface MonsterSpellcasting {
    name: string;
    type: "spellcasting";
    headerEntries: Entry[];
    will?: string[];
    daily?: Record<string, string[]>;
    ability: string;
    displayAs: "action" | "bonus action" | "reaction" | "trait";
    hidden?: string[];
}