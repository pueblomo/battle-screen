import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import type {MonsterCR} from "@/lib/monster-types.ts";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getMonsterType(type: string | { type: string | { choose: string[] }; tags?: string[] }): string {
    switch (typeof type) {
        case "string":
            return type
        case "object":
            // Handle nested type structure
            if (typeof type.type === "string") {
                return type.type
            } else if (typeof type.type === "object" && "choose" in type.type) {
                // Handle choose structure - join the options
                return type.type.choose.join(" or ")
            }
            return "Unknown"
        case "undefined":
            return "Unknown"
    }
}

function calculateProficiencyBonus(cr: string): number {
    const crNumber = parseInt(cr)
    if (crNumber <= 4) return 2
    if (crNumber <= 8) return 3
    if (crNumber <= 12) return 4
    if (crNumber <= 16) return 5
    if (crNumber <= 20) return 6
    if (crNumber <= 24) return 7
    if (crNumber <= 28) return 8
    return 9
}

export function getProficiencyBonus(cr: string | MonsterCR): number {
    switch (typeof cr) {
        case "string":
            if (cr.includes("/")) {
                return 2
            }
            return calculateProficiencyBonus(cr)
        default:
            return calculateProficiencyBonus(cr.cr)
    }
}

export function calculateStatBonus(stat: number): number {
    if (stat === 3) return -4
    if (stat <= 5) return -3
    if (stat <= 7) return -2
    if (stat <= 9) return -1
    if (stat <= 11) return 0
    if (stat <= 13) return 1
    if (stat <= 15) return 2
    if (stat <= 17) return 3
    if (stat <= 19) return 4
    if (stat <= 21) return 5
    if (stat <= 23) return 6
    if (stat <= 25) return 7
    return 8
}

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function calculateExperiencePoints(cr: string): string {
    const fractionalCRs: { [key: string]: number } = {
        "1/8": 0.125,
        "1/4": 0.25,
        "1/2": 0.5
    };

    let crNum: number;
    if (cr in fractionalCRs) {
        crNum = fractionalCRs[cr];
    } else {
        crNum = Number(cr);
    }

    const crToXPMap: { [key: number]: number } = {
        0: 0,
        0.125: 25,
        0.25: 50,
        0.5: 100,
        1: 200,
        2: 450,
        3: 700,
        4: 1100,
        5: 1800,
        6: 2300,
        7: 2900,
        8: 3900,
        9: 5000,
        10: 5900,
        11: 7200,
        12: 8400,
        13: 10000,
        14: 11500,
        15: 13000,
        16: 15000,
        17: 18000,
        18: 20000,
        19: 22000,
        20: 25000,
        21: 33000,
        22: 41000,
        23: 50000,
        24: 62000,
        25: 75000,
        26: 90000,
        27: 105000,
        28: 120000,
        29: 135000,
        30: 155000
    };

    // Return XP as string if exact CR match found
    if (crNum in crToXPMap) {
        return crToXPMap[crNum].toString();
    }

    return "0"
}