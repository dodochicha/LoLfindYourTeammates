import { gql } from "@apollo/client";

// TODO 3.1 Mutation - Update item
export const CREATE_ITEM_MUTATION = gql`
  mutation CreateItem($input: CreateItemInput!) {
    createItem(input: $input) {
      id
      name
      amount
      category
      date
      description
    }
  }
`;
// TODO 3.1 End

export const UPDATE_ITEM_MUTATION = gql`
  mutation UpdateItem($input: UpdateItemInput!) {
    updateItem(input: $input) {
      id
    }
  }
`;

export const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id)
  }
`;

export const CREATE_PLAYER_MUTATION = gql`
  mutation CreatePlayer($input: CreatePlayerInput!) {
    createPlayer(input: $input) {
      id
      name
      lanes
      heros
      rank
    }
  }
`;

export const UPDATE_PLAYER_MUTATION = gql`
  mutation UpdatePlayer($input: UpdatePlayerInput!) {
    updatePlayer(input: $input) {
      id
      name
      lanes
      heros
      rank
    }
  }
`;
