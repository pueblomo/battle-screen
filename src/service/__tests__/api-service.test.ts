import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  it,
  expect,
  vi,
} from "vitest";
import {
  apiGetMonsters,
  apiGetSpells,
  apiGetTreasureTable,
  getItemRarityTable,
} from "../api-service";

vi.stubEnv("BASE_URL", "http://test.com/");

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("apiGetMonsters", () => {
  it("fetches and returns monster data", async () => {
    server.use(
      http.get("*/bestiary-mm.json", () => {
        return HttpResponse.json({
          monster: [
            { name: "Goblin", cr: "1/4", type: "humanoid" },
            { name: "Dragon", cr: "17", type: "dragon" },
          ],
        });
      }),
    );

    const result = await apiGetMonsters(
      `${import.meta.env.BASE_URL}bestiary-mm.json`,
    );

    expect(result.data.monster).toHaveLength(2);
    expect(result.data.monster[0].name).toBe("Goblin");
  });

  it("handles server errors gracefully", async () => {
    server.use(
      http.get("*/error/bestiary-mm.json", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    await expect(
      apiGetMonsters(`${import.meta.env.BASE_URL}error/bestiary-mm.json`),
    ).rejects.toThrow();
  });
});

describe("apiGetSpells", () => {
  it("fetches and returns spell data", async () => {
    server.use(
      http.get("*/spells.json", () => {
        return HttpResponse.json({
          spell: [
            {
              name: "Fireball",
              source: "PHB",
              page: 241,
              level: 3,
              school: "evocation",
              time: [{ number: 1, unit: "action" }],
              range: { type: "point", distance: { type: "feet", amount: 150 } },
              components: {
                v: true,
                s: true,
                m: "a tiny ball of bat guano and sulfur",
              },
              duration: [{ type: "instant" }],
              entries: [
                "A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame.",
              ],
              damageInflict: ["fire"],
              savingThrow: ["dex"],
              areaTags: ["S"],
            },
            {
              name: "Magic Missile",
              source: "PHB",
              page: 257,
              level: 1,
              school: "evocation",
              time: [{ number: 1, unit: "action" }],
              range: { type: "point", distance: { type: "feet", amount: 120 } },
              components: { v: true, s: true },
              duration: [{ type: "instant" }],
              entries: [
                "You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range.",
              ],
              damageInflict: ["force"],
              scalingLevelDice: {
                label: "additional darts",
                scaling: { "3": "4", "5": "5", "7": "6", "9": "7" },
              },
            },
          ],
        });
      }),
    );

    const result = await apiGetSpells(`${import.meta.env.BASE_URL}spells.json`);

    expect(result.data.spell).toHaveLength(2);
    expect(result.data.spell[0].name).toBe("Fireball");
    expect(result.data.spell[0].level).toBe(3);
    expect(result.data.spell[0].range.distance?.amount).toBe(150);
  });
});

describe("apiGetTreasureTable", () => {
  it("transforms CSV data to TreasureRow format", async () => {
    server.use(
      http.get("*/treasure-table.csv", () => {
        return new HttpResponse(`"1d100","Item"
"01-04","Ammunition, +2"
"05-08","Bag of Beans"
"09-12","Belt of Dwarvenkind"
"13-16","Boots of Levitation"`);
      }),
    );

    const result = await apiGetTreasureTable("treasure", "table");

    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({ dice: "01-04", item: "Ammunition, +2" });
    expect(result[2]).toEqual({ dice: "09-12", item: "Belt of Dwarvenkind" });
  });
});

describe("getItemRarityTable", () => {
  it("transforms CSV data to RarityRow format", async () => {
    server.use(
      http.get("*/item-rarity.csv", () => {
        return new HttpResponse(`"Levels 1–4","Levels 5–10","Levels 11–16","Levels 17–20","Item's Rarity"
"01–54","01–30","01–11","—","Common"
"55–91","31–81","12–34","—","Uncommon"
"92–00","82–98","35–70","01–20","Rare"
"—","99–00","71–93","21–64","Very Rare"
"—","—","94–00","65–00","Legendary"`);
      }),
    );

    const result = await getItemRarityTable();

    expect(result).toHaveLength(5);
    expect(result[2]).toEqual({
      level1: "92–00",
      level2: "82–98",
      level3: "35–70",
      level4: "01–20",
      rarity: "Rare",
    });
  });
});
