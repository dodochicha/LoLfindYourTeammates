import itemModel from "./models/item.js";
import playerModel from "./models/player.js";

const example = [
  {
    id: "1",
    name: "brunch",
    amount: 1000,
    date: new Date("2022-12-05T07:00:00.360Z").getTime(),
    category: "FOOD",
    description: "Too expensive.",
  },
  {
    id: "2",
    name: "MRT",
    amount: 30,
    date: new Date("2022-12-05T08:30:00.360Z").getTime(),
    category: "TRANSPORT",
    description: "Go to school.",
  },
  {
    id: "3",
    name: "protection money",
    amount: 1000,
    date: new Date("2022-12-05T12:00:00.360Z").getTime(),
    category: "OTHER",
    description: "",
  },
  {
    id: "4",
    name: "ointment",
    amount: 100,
    date: new Date("2022-12-05T15:00:00.360Z").getTime(),
    category: "HEALTH",
    description: "I broke my leg on my way home QQ.",
  },
  {
    id: "5",
    name: "salary",
    amount: 2000,
    date: new Date("2022-12-06T19:00:00.360Z").getTime(),
    category: "INCOME",
    description: "Math tutor.",
  },
];

const example2 = [
  {
    id: "1",
    name: "T1 Faker",
    lane: ["Mid"],
    heros: ["雷茲"],
    rank: "菁英",
  },
  {
    id: "2",
    name: "T1 Oner",
    lane: ["Jungle"],
    heros: ["維爾戈"],
    rank: "菁英",
  },
  {
    id: "3",
    name: "T1 Zeus",
    lane: ["Top"],
    heros: ["厄薩斯"],
    rank: "菁英",
  },
  {
    id: "4",
    name: "T1 Gumayusi",
    lane: ["Ad"],
    heros: ["希維爾", "凱特琳", "法洛士"],
    rank: "菁英",
  },
  {
    id: "5",
    name: "T1 Keria",
    lane: ["Sup"],
    heros: ["拉克斯", "卡瑪"],
    rank: "菁英",
  },
];

const dataInit = async () => {
  await itemModel.deleteMany({});
  await itemModel.insertMany(example);
  await playerModel.deleteMany({});
  await playerModel.insertMany(example2);
  console.log("Database initialized!");
};

export { dataInit };
