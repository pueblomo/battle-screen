export interface Monster {
    name: string;
    source: string;
    page: number;
    size: string[];
    type: string | { type: string | { choose: string[] }; tags?: string[] };
    alignment?: string[];
    ac: (number | MonsterAC)[];
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
    trait?: MonsterFeature[];
    action?: MonsterFeature[];
    legendary?: MonsterFeature[];
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

export interface MonsterGear {
    item: string,
    quantity: number
}

export interface MonsterAC {
    ac: number;
    from?: string[];
}

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

export interface MonsterCR {
    cr: string;
    xp?: number;
    xpLair?: number;
}

export interface MonsterFeature {
    name: string;
    entries: (string | MonsterFeature)[];
}

export interface MonsterSpellcasting {
    name: string;
    type: "spellcasting";
    headerEntries: string[];
    will?: string[];
    daily?: Record<string, string[]>;
    ability: string;
    displayAs: "action" | "bonus action" | "reaction" | "trait";
    hidden?: string[];
}