import { gql } from "@apollo/client";

export const ITEM_CREATED_SUBSCRIPTION = gql`
  subscription ItemCreated {
    itemCreated {
      id
      name
      amount
      category
      date
      description
    }
  }
`;

export const ITEM_UPDATED_SUBSCRIPTION = gql`
  subscription ItemUpdated {
    itemUpdated {
      id
      name
      amount
      category
      date
      description
    }
  }
`;

// TODO 6.4 Graphql of subscription
export const ITEM_DELETED_SUBSCRIPTION = gql`
  subscription {
    itemDeleted
  }
`;
// TODO 6.4 End

export const PLAYER_CREATED_SUBSCRIPTION = gql`
  subscription PlayerCreated {
    playerCreated {
      id
      name
      lanes
      heros
      rank
    }
  }
`;

export const PLAYER_UPDATED_SUBSCRIPTION = gql`
  subscription PlayerUpdated {
    playerUpdated {
      id
      name
      lanes
      heros
      rank
    }
  }
`;

export const INVITATION_CREATED_SUBSCRIPTION = gql`
  subscription InvitationCreated {
    invitationCreated {
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

export const INVITATION_UPDATED_SUBSCRIPTION = gql`
  subscription InvitationUpdated {
    invitationUpdated {
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
