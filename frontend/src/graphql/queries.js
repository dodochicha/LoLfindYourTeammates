import { gql } from "@apollo/client";

export const GET_ITEMS_QUERY = gql`
  query GET_ITEMS_QUERY {
    items {
      id
      name
      description
      date
      # TODO 2.1 Write query GraphQL
      amount
      category
      # TODO 2.1 End
    }
  }
`;

export const GET_PLAYERS_QUERY = gql`
  query GET_PLAYERS_QUERY($filter: Filter!) {
    players(filter: $filter) {
      id
      name
      lanes
      heros
      rank
    }
  }
`;

export const GET_INVITATIONS_QUERY = gql`
  query invitations {
    invitations {
      _id
      sender
      to
      date
      time
      message
      read
      ok
    }
  }
`;
