import {useEffect, useState} from "react";
import {apiGetTreasureTable, getItemRarityTable, type RarityRow, type TreasureRow} from "@/service/api-service.ts";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

export default function Treasure() {
    const [rarityTable, setRarityTable] = useState<RarityRow[]>([])
    const [treasureTable, setTreasureTable] = useState<TreasureRow[]>([])
    const [tableHalf, setTableHalf] = useState<number>(0)
    const [type, setType] = useState<string>("")
    const [rarity, setRarity] = useState<string>("")

    async function getRarityTable() {
        const result = await getItemRarityTable()
        setRarityTable(result)
    }

    async function getTreasureTable(type: string, rarity: string) {
        const result = await apiGetTreasureTable(type, rarity)
        setTreasureTable(result)
    }

    useEffect(() => {
        void getRarityTable()
    }, []);

    useEffect(() => {
        if (type && rarity) {
            void getTreasureTable(type, rarity)
        }
    }, [type, rarity]);

    useEffect(() => {
        setTableHalf(Math.ceil(treasureTable.length / 2))
    }, [treasureTable])


    return (
        <div className="container mx-auto py-4 grid gap-4 w-full">
            {rarityTable.length > 0 && (
                <Table>
                    <TableCaption>Item Rarity</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-[#CBB994]">
                            <TableHead className="text-center">Levels 1–4</TableHead>
                            <TableHead className="text-center">Levels 5–10</TableHead>
                            <TableHead className="text-center">Levels 11–16</TableHead>
                            <TableHead className="text-center">Levels 17–20</TableHead>
                            <TableHead className="text-center">Item's Rarity</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rarityTable.map((rarityItem, index) => (
                            <TableRow key={rarityItem.rarity} className={`${index % 2 === 0 ? "bg-[#F7F3E8]" : "bg-[#EDE5D1]"} hover:bg-[#D8CBA8]`}>
                                <TableCell>{rarityItem.level1}</TableCell>
                                <TableCell>{rarityItem.level2}</TableCell>
                                <TableCell>{rarityItem.level3}</TableCell>
                                <TableCell>{rarityItem.level4}</TableCell>
                                <TableCell>{rarityItem.rarity}</TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            )}
            <div className="flex flex-col gap-2 justify-center py-4">
                <div className="flex gap-2 justify-center">
                    <Select onValueChange={setType}>
                        <SelectTrigger className="w-40 bg-[#F7F3E8] drop-shadow-lg">
                            <SelectValue placeholder="Type"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="arcana">Arcana</SelectItem>
                            <SelectItem value="armaments">Armaments</SelectItem>
                            <SelectItem value="implements">Implements</SelectItem>
                            <SelectItem value="relics">Relics</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={setRarity}>
                        <SelectTrigger className="w-40 bg-[#F7F3E8] drop-shadow-lg">
                            <SelectValue placeholder="Rarity"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="common">Common</SelectItem>
                            <SelectItem value="uncommon">Uncommon</SelectItem>
                            <SelectItem value="rare">Rare</SelectItem>
                            <SelectItem value="veryrare">Very Rare</SelectItem>
                            <SelectItem value="legendary">Legendary</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {treasureTable.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[#CBB994]">
                                    <TableHead className="text-center">1d100</TableHead>
                                    <TableHead className="text-center">Item</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {treasureTable.slice(0, tableHalf).map((treasure, index) => (
                                    <TableRow key={treasure.item} className={`${index % 2 === 0 ? "bg-[#F7F3E8]" : "bg-[#EDE5D1]"} hover:bg-[#D8CBA8]`}>
                                        <TableCell>{treasure.dice}</TableCell>
                                        <TableCell>{treasure.item}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[#CBB994]">
                                    <TableHead className="text-center">1d100</TableHead>
                                    <TableHead className="text-center">Item</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {treasureTable.slice(tableHalf).map((treasure, index) => (
                                    <TableRow key={treasure.item} className={`${index % 2 === 0 ? "bg-[#F7F3E8]" : "bg-[#EDE5D1]"} hover:bg-[#D8CBA8]`}>
                                        <TableCell>{treasure.dice}</TableCell>
                                        <TableCell>{treasure.item}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    )
}