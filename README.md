# LoLfindYourTeammates

## Getting Started

```bash
cd frontend
npm i
npm start
```

```bash
cd backend
npm i
npm run server
```

## GraphQL Playground

### Queries

```graphql
query players {
  players(filter: { name: "", lanes: [], rank: [] }) {
    id
    name
    lanes
    heros
    rank
  }
}
```

### Mutations

```graphql
mutation createPlayer {
  createPlayer(
    input: {
      id: "6"
      name: "Drx Deft"
      lanes: ["Button"]
      heros: ["凱特琳"]
      rank: "宗師"
    }
  ) {
    id
    name
    lanes
    heros
    rank
  }
}
```

```graphql
mutation createPlayer {
  createPlayer(
    input: {
      id: "7"
      name: "FW NL"
      lanes: ["Button"]
      heros: ["凱特琳"]
      rank: "宗師"
    }
  ) {
    id
    name
    lanes
    heros
    rank
  }
}
```

### Subscriptions

```graphql
subscription playerUpdated {
  playerUpdated {
    id
    name
    lanes
    heros
    rank
  }
}
```

```graphql
subscription PlayerCreated {
  playerCreated {
    id
    name
    lanes
    heros
    rank
  }
}
```

## Route

- /login

- /register

- /search

- /profile

## Mark

- dataInit() : 測試用的起始資料，可註解掉或修改，在 backend/src/index
