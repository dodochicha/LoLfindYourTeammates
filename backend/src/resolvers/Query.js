const Query = {
  items: async (parent, args, { itemModel }) => {
    const items = await itemModel.find().sort();
    return items;
  },
  players: async (parent, args, { playerModel }) => {
    const players = await playerModel.find().sort();
    return players;
  },
};

export default Query;
