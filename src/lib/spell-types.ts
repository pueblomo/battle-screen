export interface Spell {
    name: string;
    source: string;
    page: number;
    srd52?: boolean;
    basicRules2024?: boolean;
    level: number;
    school: string;
    time: SpellTime[];
    range: SpellRange;
    components: SpellComponents;
    duration: SpellDuration[];
    entries: (string | SpellEntry)[];
    entriesHigherLevel?: SpellEntry[];
    scalingLevelDice?: ScalingLevelDice;
    damageInflict?: string[];
    savingThrow?: string[];
    conditionInflict?: string[];
    affectsCreatureType?: string[];
    miscTags?: string[];
    areaTags?: string[];
    meta?: {
        ritual?: boolean;
    };
    hasFluffImages?: boolean;
}

export interface SpellTime {
    number: number;
    unit: "action" | "bonus" | "reaction" | "minute" | "hour";
    condition?: string
}

export interface SpellRange {
    type: "point" | "emanation" | "self";
    distance?: {
        type: "feet" | "self" | "touch";
        amount?: number;
    };
}

export interface SpellComponents {
    v?: boolean;
    s?: boolean;
    m?: string | boolean;
}

export interface SpellDuration {
    type: "instant" | "timed";
    duration?: {
        type: "round" | "minute" | "hour" | "day";
        amount: number;
    };
    concentration?: boolean;
}

export interface SpellEntry {
    type: "entries" | "list";
    name?: string;
    style?: string;
    entries?: (string | SpellEntry)[];
    items?: SpellEntry[];
}

export interface ScalingLevelDice {
    label: string;
    scaling: Record<string, string>; // level -> dice, e.g. "5": "2d6"
}