import { useQuery } from "@apollo/client";


import { GET_ITEMS_QUERY } from "../graphql/queries";

import { GET_PLAYERS_QUERY } from "../graphql/queries";
import {
  PLAYER_CREATED_SUBSCRIPTION,
  PLAYER_UPDATED_SUBSCRIPTION,
} from "../graphql/subscriptions";
import { useEffect } from "react";
import React from "react";
import { Space, Table, Tag } from "antd";
import { columns } from "../utils/columns";

function Search() {
  const {
    loading,
    error,
    data: playersData,
    subscribeToMore,
  } = useQuery(GET_PLAYERS_QUERY);
  if (playersData !== undefined) {
    var players = playersData.players.map((player) => ({
      ...player,
      key: player.id,
    }));
  } else {
    players = [];
  }
  useEffect(() => {
    subscribeToMore({
      document: PLAYER_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const player = subscriptionData.data.playerCreated;
        return {
          players: [player, ...prev.players],
        };
      },
    });
  }, [subscribeToMore]);

  useEffect(() => {
    subscribeToMore({
      document: PLAYER_UPDATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const updatedPlayer = subscriptionData.data.playerUpdated;
        return {
          players: prev.players.map((player) =>
            player.id === updatedPlayer.id ? updatedPlayer : player
          ),
        };
      },
    });
  }, [subscribeToMore]);
  return (
    <>
      <div>Search</div>
      <Table columns={columns} dataSource={players} />
    </>
  );
}

export default Search;