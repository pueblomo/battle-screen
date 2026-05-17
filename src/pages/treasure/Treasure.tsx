import { Fragment, type ReactNode, useEffect, useMemo, useState } from "react";
import {
  apiGetTreasureTable,
  apiGetItemRarityTable,
  type RarityRow,
  type TreasureRow,
  apiGetTreasureMoneyTable,
  type MoneyRow,
  apiGetItemDetails,
  type ItemDetail,
  type ItemEntry,
} from "@/service/api-service.ts";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { replacePlaceholdersJsx } from "@/lib/utils.tsx";

function normalizeItemName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getItemTokens(name: string): string[] {
  return normalizeItemName(name)
    .split(" ")
    .filter((token) => token.length > 1);
}

function findItemDetail(
  itemName: string,
  itemsByName: Map<string, ItemDetail>,
  itemDetails: ItemDetail[],
): ItemDetail | undefined {
  const normalizedName = normalizeItemName(itemName);
  const exactMatch = itemsByName.get(normalizedName);
  if (exactMatch) return exactMatch;

  const itemTokens = getItemTokens(itemName);
  if (itemTokens.length === 0) return undefined;

  return itemDetails.find((item) => {
    const candidateName = normalizeItemName(item.name);
    return itemTokens.every((token) => candidateName.includes(token));
  });
}

function renderItemEntry(entry: ItemEntry, index: number): ReactNode {
  if (typeof entry === "string") {
    return <p key={index}>{replacePlaceholdersJsx(entry)}</p>;
  }

  if (entry.type === "list" && entry.items) {
    return (
      <ul key={index} className="list-disc pl-5">
        {entry.items.map((item, itemIndex) => (
          <li key={itemIndex}>{renderItemEntry(item, itemIndex)}</li>
        ))}
      </ul>
    );
  }

  if (entry.type === "table" && entry.rows) {
    return (
      <div key={index} className="overflow-x-auto">
        {entry.caption && <p className="font-bold">{entry.caption}</p>}
        <Table>
          {entry.colLabels && (
            <TableHeader>
              <TableRow>
                {entry.colLabels.map((label) => (
                  <TableHead key={label}>{replacePlaceholdersJsx(label)}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
          )}
          <TableBody>
            {entry.rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>
                    {renderItemEntry(cell, cellIndex)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (entry.entries) {
    return (
      <div key={index}>
        {entry.name && (
          <p className="font-bold italic">{replacePlaceholdersJsx(entry.name)}</p>
        )}
        <div className="grid gap-2">
          {entry.entries.map((nestedEntry, nestedIndex) =>
            renderItemEntry(nestedEntry, nestedIndex),
          )}
        </div>
      </div>
    );
  }

  if (entry.items) {
    return (
      <div key={index} className="grid gap-2">
        {entry.items.map((item, itemIndex) => renderItemEntry(item, itemIndex))}
      </div>
    );
  }
}

export default function Treasure() {
  const [rarityTable, setRarityTable] = useState<RarityRow[]>([]);
  const [treasureTable, setTreasureTable] = useState<TreasureRow[]>([]);
  const [moneyTable, setMoneyTable] = useState<MoneyRow[]>([]);
  const [tableHalf, setTableHalf] = useState<number>(0);
  const [type, setType] = useState<string>("");
  const [rarity, setRarity] = useState<string>("");
  const [itemDetails, setItemDetails] = useState<ItemDetail[]>([]);
  const [selectedItemName, setSelectedItemName] = useState<string>("");

  const itemsByName = useMemo(
    () =>
      new Map(
        itemDetails.map((item) => [normalizeItemName(item.name), item] as const),
      ),
    [itemDetails],
  );

  const selectedItem = useMemo(
    () => findItemDetail(selectedItemName, itemsByName, itemDetails),
    [itemDetails, itemsByName, selectedItemName],
  );

  async function getRarityTable() {
    const result = await apiGetItemRarityTable();
    setRarityTable(result);
  }

  async function getTreasureTable(type: string, rarity: string) {
    const result = await apiGetTreasureTable(type, rarity);
    setTreasureTable(result);
  }

  async function getMoneyTable() {
    const result = await apiGetTreasureMoneyTable();
    setMoneyTable(result);
  }

  async function getItemDetails() {
    const result = await apiGetItemDetails();
    setItemDetails(result);
  }

  useEffect(() => {
    void getRarityTable();
    void getMoneyTable();
    void getItemDetails();
  }, []);

  useEffect(() => {
    if (type && rarity) {
      void getTreasureTable(type, rarity);
    }
  }, [type, rarity]);

  useEffect(() => {
    setTableHalf(Math.ceil(treasureTable.length / 2));
  }, [treasureTable]);

  function renderTreasureRow(treasure: TreasureRow, index: number) {
    return (
      <TableRow
        key={`${treasure.dice}-${treasure.item}`}
        className={`${index % 2 === 0 ? "bg-[#F7F3E8]" : "bg-[#EDE5D1]"} hover:bg-[#D8CBA8]`}
      >
        <TableCell>{treasure.dice}</TableCell>
        <TableCell>
          <Button
            type="button"
            variant="link"
            className="h-auto whitespace-normal p-0 text-left font-normal text-red-900 underline"
            onClick={() => setSelectedItemName(treasure.item)}
          >
            {treasure.item}
          </Button>
        </TableCell>
      </TableRow>
    );
  }

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
              <TableRow
                key={rarityItem.rarity}
                className={`${index % 2 === 0 ? "bg-[#F7F3E8]" : "bg-[#EDE5D1]"} hover:bg-[#D8CBA8]`}
              >
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
      {moneyTable.length > 0 && (
        <Table>
          <TableCaption>Money Treasure</TableCaption>
          <TableHeader>
            <TableRow className="bg-[#CBB994]">
              <TableHead className="text-center">CR</TableHead>
              <TableHead className="text-center">Treasure</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {moneyTable.map((moneyItem, index) => (
              <TableRow
                key={moneyItem.cr}
                className={`${index % 2 === 0 ? "bg-[#F7F3E8]" : "bg-[#EDE5D1]"} hover:bg-[#D8CBA8]`}
              >
                <TableCell>{moneyItem.cr}</TableCell>
                <TableCell>{moneyItem.treasure}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <div className="flex flex-col gap-2 justify-center py-4">
        <div className="flex gap-2 justify-center">
          <Select onValueChange={setType}>
            <SelectTrigger className="w-40 bg-[#F7F3E8] drop-shadow-lg">
              <SelectValue placeholder="Type" />
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
              <SelectValue placeholder="Rarity" />
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
                {treasureTable
                  .slice(0, tableHalf)
                  .map((treasure, index) => renderTreasureRow(treasure, index))}
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
                {treasureTable
                  .slice(tableHalf)
                  .map((treasure, index) => renderTreasureRow(treasure, index))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      <Dialog
        open={selectedItemName.length > 0}
        onOpenChange={(open) => {
          if (!open) setSelectedItemName("");
        }}
      >
        <DialogContent
          style={{
            backgroundImage: `url('${import.meta.env.BASE_URL}statblockparch.jpg')`,
          }}
          className="max-h-[85vh] overflow-y-auto border-4 border-orange-200 font-[--font-family-libre-baskerville] sm:max-w-2xl"
        >
          <DialogHeader>
            <DialogTitle className="text-red-900">
              {selectedItem?.name ?? selectedItemName}
            </DialogTitle>
            <DialogDescription className="text-xs text-stone-700">
              {[selectedItem?.rarity, selectedItem?.type, selectedItem?.source]
                .filter(Boolean)
                .join(" · ")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 text-sm text-stone-950">
            {selectedItem?.reqAttune && (
              <p className="italic">
                {selectedItem.reqAttune === true
                  ? "Requires attunement"
                  : `Requires attunement ${selectedItem.reqAttune}`}
              </p>
            )}
            {selectedItem?.entries?.length ? (
              selectedItem.entries.map((entry, index) => (
                <Fragment key={index}>{renderItemEntry(entry, index)}</Fragment>
              ))
            ) : (
              <p>No item description was found in the loaded item files.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
