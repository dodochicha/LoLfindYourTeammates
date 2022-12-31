import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_PLAYERS_QUERY } from "../graphql/queries";
import {
  PLAYER_CREATED_SUBSCRIPTION,
  PLAYER_UPDATED_SUBSCRIPTION,
} from "../graphql/subscriptions";
import { useEffect, useState } from "react";
import React from "react";
import { Space, Table, Tag, Layout, theme, Button, Typography } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { columns } from "../utils/columns";
import Filter from "./Filter";
const { Title } = Typography;
const { Header, Content, Sider, Footer } = Layout;
function Search() {
  const [laneFilter, setLaneFilter] = useState([]);
  const [rankFilter, setRankFilter] = useState([]);
  const [filter, setFilter] = useState({ lane: [], rank: [] });
  const [a, setA] = useState(0);
  useEffect(() => {
    var newFilter = { lane: laneFilter, rank: filter.rank };
    setFilter(newFilter);
  }, [laneFilter]);
  useEffect(() => {
    var newFilter = { lane: filter.lane, rank: rankFilter };
    setFilter(newFilter);
  }, [rankFilter]);
  const {
    loading,
    error,
    data: playersData,
    subscribeToMore,
  } = useQuery(GET_PLAYERS_QUERY, {
    variables: { filter: filter },
  });
  if (playersData !== undefined) {
    var players = playersData.players.map((player) => ({
      ...player,
      key: player.id,
    }));
  } else {
    players = [];
  }

  return (
    <>
      <Header>Search</Header>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          width={400}
          style={{
            background: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <Filter
            laneFilter={laneFilter}
            setLaneFilter={setLaneFilter}
            rankFilter={rankFilter}
            setRankFilter={setRankFilter}
          />
        </Sider>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: "rgba(255, 255, 255, 0.2)",
            height: "100%",
          }}
        >
          <Layout>
            <Sider
              width={45}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                height: "32px",
              }}
            >
              <Button
                icon={<RedoOutlined />}
                onClick={() => window.location.reload()}
              />
            </Sider>
            <Content
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                height: "32px",
              }}
            >
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  fontSize: "18px",
                  height: "32px",
                }}
              >
                refresh
              </div>
            </Content>
          </Layout>
          <Table columns={columns} dataSource={players} className="table" />
        </Content>
      </Layout>
    </>
  );
}

export default Search;
