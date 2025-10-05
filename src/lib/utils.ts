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
    return 5
}