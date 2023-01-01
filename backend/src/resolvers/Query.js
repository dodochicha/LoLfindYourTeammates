const Query = {
  items: async (parent, args, { itemModel }) => {
    const items = await itemModel.find().sort();
    return items;
  },
  players: async (parent, { filter }, { playerModel }) => {
    const players = await playerModel
      .find({
        lane: {
          $in:
            filter.lane.length === 0
              ? ["Top", "Jungle", "Middle", "Button", "Support"]
              : filter.lane,
        },
        rank: {
          $in:
            filter.rank.length === 0
              ? ["鐵", "銅", "銀", "金", "白金", "鑽石", "大師", "宗師", "菁英"]
              : filter.rank,
        },
      })
      .sort();
    return players;
  },
};

export default Query;
