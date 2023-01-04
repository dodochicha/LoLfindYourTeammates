# LoLfindYourTeammates

安裝測試步驟

* WINDOWS:
  * frontend(在`localhost:3000`)
    ```console
    cd frontend
    npm install
    npm start
    ```
  * backend
  在`LoLfindYourTeammates/backend`新增`.env`內含`MONGO_URL= //your database url`
  
    ```console
    cd backend
    npm install
    npm run server
    ```
- IOS:
     * frontend(在`localhost:3000`)
    ```console
    cd frontend
    yarn install
    yarn start
    ```
    * backend
    * 在`LoLfindYourTeammates/backend`新增`.env`內含`MONGO_URL= //your database url`
    
    
    ```console
    cd backend
    yarn install
    yarn server
    ```
分工
* 鄭炘棠
    * 使用者資料庫
    * 搜尋頁面前端+後端
* 吳芳齡
    * 使用者帳密前端+後端
    * 個人資料前端+後端
* 陳翰雯
    * 玩家頁面前端
    * 所有頁面的css

功能說明
1. 帳號註冊/登入：

     我們有提供註冊以及登入的服務，註冊時需填寫帳號以及密碼。
     `可記住密碼(但只能記一次)。`
     
2. 個人資料
    
    個人資料的內容包含：遊戲名稱、擅長路線、擅長英雄、排位以及fb網址。個人資料填寫的用途是讓別的使用者可以看到或搜尋到你的資料。
    
4. 搜尋及篩選
    
    使用者成功登入之後的畫面就是搜尋頁面。在此頁面，使用者可以搜尋玩家名字或是用條件(如擅長路線或排位)篩選玩家。
    
    `條件篩選玩家功能在左邊custom conditions，文字搜尋在上方輸入框，需點選搜尋鍵才能跑出新的結果。`
    
5. 玩家頁面

    每個玩家都有屬於自己的精美玩家頁面，使用者可以在搜尋頁面點選玩家名字來查看他們的玩家頁面。
    `從搜尋頁面的table點選玩家名字即可連結到對應的玩家頁面，另外，如果通知欄(喇叭圖示)中有邀請函，點選裡頭的玩家名字也可連結至玩家頁面。`
    
6. 邀請函
    
    使用者可以對玩家送出邀請函。邀請函的內容包括：遊玩的時間以及想說的話。收到邀請函的玩家可以同意或拒絕。
    `使用者點選table的invite somebody會跳出創建邀請函的視窗。可以輸入想要一起玩的時間和想說的話，按下invite就代表送出了。這時候另一個人的通知欄會收到邀請函，可以按勾勾或叉叉。這時候，原來送出邀請函的人的通知欄會收到回覆。`
    
7. 注意事項

    * 一次只能登入一個人
    * 如果沒登入的話，不能透過url access搜尋頁面和個人資料頁面
    * 重啟後端會重設資料庫，起始資料有玩家五個人
    * 不同人不能取一樣的名字

---
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
