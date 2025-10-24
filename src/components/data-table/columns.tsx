import type {Monster} from "@/lib/monster-types.ts";
import type {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {getMonsterType} from "@/lib/utils.tsx";

export const columns: ColumnDef<Monster>[] = [
    {
        id: "select",
        header: "Select",
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "name",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="text-left">{row.getValue("name")}</div>
    },
    {
        id: "type",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        accessorFn: monster => getMonsterType(monster.type),
        cell: ({row}) => <div className="text-left">{row.getValue("type")}</div>
    },
    {
        id: "cr",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    CR
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        accessorFn: monster => {
            switch (typeof monster.cr) {
                case "string":
                    return monster.cr
                case "object":
                    return monster.cr.cr
                case "undefined":
                    return "Unknown"
            }
        },
        cell: ({row}) => <div className="text-left">{row.getValue("cr")}</div>
    }
]