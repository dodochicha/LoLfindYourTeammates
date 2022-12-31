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
  players(filter: { lane: [], rank: [] }) {
    id
    name
    lane
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
      lane: ["Ad"]
      heros: ["凱特琳"]
      rank: "宗師"
    }
  ) {
    id
    name
    lane
    heros
    rank
  }
}
```

```graphql
mutation updatePlayer {
  updatePlayer(
    input: {
      id: "2"
      name: "T1 Zeus"
      lane: ["Top"]
      heros: ["杰西", "厄薩斯"]
      rank: "菁英"
    }
  ) {
    id
    name
    lane
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
    lane
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
    lane
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
