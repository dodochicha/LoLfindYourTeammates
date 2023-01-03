const Mutation = {
  createItem: async (parent, { input }, { itemModel, pubSub }) => {
    const newItem = new itemModel(input);
    await newItem.save();
    pubSub.publish("ITEM_CREATED", {
      itemCreated: newItem,
    });
    return newItem;
  },

  updateItem: async (parent, { input }, { itemModel, pubSub }) => {
    const item = await itemModel.findOneAndUpdate(
      { id: input.id },
      {
        $set: {
          name: input.name,
          amount: input.amount,
          category: input.category,
          date: input.date,
          description: input.description,
        },
      }
    );
    const newItem = {
      id: input.id ?? item.id,
      name: input.name ?? item.name,
      amount: input.amount ?? item.amount,
      category: input.category ?? item.category,
      date: input.date ?? item.date,
      description: input.description ?? item.description,
    };
    pubSub.publish("ITEM_UPDATED", {
      itemUpdated: newItem,
    });
    return newItem;
  },
  // TODO 5.2 Define the itemDelete mutation resolver
  // TODO 6.3 Publish itemDeleted
  deleteItem: async (parent, { id }, { itemModel, pubSub }) => {
    const Item = await itemModel.findOne({ id });
    console.log(Item);
    await itemModel.deleteOne(Item);
    pubSub.publish("ITEM_DELETED", {
      itemDeleted: id,
    });
    return id;
  },
  // TODO 5.2 End
  // TODO 6.3 End

  createPlayer: async (parent, { input }, { playerModel, pubSub }) => {
    const newPlayer = new playerModel(input);
    await newPlayer.save();
    pubSub.publish("PLAYER_CREATED", {
      playerCreated: newPlayer,
    });
    return newPlayer;
  },

  updatePlayer: async (parent, { input }, { playerModel, pubSub }) => {
    const player = await playerModel.findOneAndUpdate(
      { id: input.id },
      {
        $set: {
          name: input.name,
          lanes: input.lane,
          heros: input.heros,
          rank: input.rank,
        },
      }
    );
    const newPlayer = {
      id: input.id ?? item.id,
      name: input.name ?? player.name,
      lanes: input.lane ?? player.lane,
      heros: input.heros ?? player.lane,
      rank: input.rank ?? player.lane,
    };
    pubSub.publish("PLAYER_UPDATED", {
      playerUpdated: newPlayer,
    });
    return newPlayer;
  },
  createInvitation: async (parent, { input }, { invitationModel, pubSub }) => {
    const newInvitation = new invitationModel({ ...input, read: false });
    await newInvitation.save();
    pubSub.publish("INVITATION_CREATED", {
      invitationCreated: newInvitation,
    });
    return newInvitation;
  },

  updateInvitation: async (parent, { input }, { invitationModel, pubSub }) => {
    const invitation = await invitationModel.findOneAndUpdate(
      { _id: input._id },
      {
        $set: {
          read: true,
          ok: input.ok,
        },
      }
    );
    const newInvitation = {
      sender: invitation.sender,
      to: invitation.to,
      date: invitation.date,
      time: invitation.time,
      message: invitation.message,
      read: true,
      ok: input.ok,
    };
    pubSub.publish("INVITATION_UPDATED", {
      invitationUpdated: newInvitation,
    });
    return newInvitation;
  },
};

export default Mutation;
