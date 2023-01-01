import { useQuery } from "@apollo/client";
import { GET_PLAYERS_QUERY } from "../graphql/queries";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Table, Layout, Button, Typography, Input } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { columns } from "../utils/columns";
import Filter from "./Filter";

const { Title } = Typography;
const { Header, Content, Sider, Footer } = Layout;
function Search() {
  const [laneFilter, setLaneFilter] = useState([]);
  const [rankFilter, setRankFilter] = useState([]);
  const [filter, setFilter] = useState({ name: "", lane: [], rank: [] });
  const [nameFilter, setNameFilter] = useState("");
  const { Search } = Input;
  useEffect(() => {
    var newFilter = { ...filter, lane: laneFilter };
    setFilter(newFilter);
  }, [laneFilter]);
  useEffect(() => {
    var newFilter = { ...filter, rank: rankFilter };
    setFilter(newFilter);
  }, [rankFilter]);
  useEffect(() => {
    var newFilter = { ...filter, name: nameFilter };
    setFilter(newFilter);
  }, [nameFilter]);
  const {
    loading,
    error,
    data: playersData,
    subscribeToMore,
  } = useQuery(GET_PLAYERS_QUERY, {
    variables: { filter: filter },
  });
  const navigate = useNavigate();
  if (playersData !== undefined) {
    var players = playersData.players.map((player) => ({
      ...player,
      key: player.id,
    }));
  } else {
    players = [];
  }
  const handleToProfile = () => {
    navigate("/profile");
  };
  const ShowTime = () => {
    var NowDate = new Date();
    var h = ("00" + NowDate.getHours()).slice(-2);
    var m = ("00" + NowDate.getMinutes()).slice(-2);
    var s = ("00" + NowDate.getSeconds()).slice(-2);
    return `${h}:${m}:${s}`;
  };
  const onSearch = (value) => setNameFilter(value);

  return (
    <>
      <Header>
        <Layout>
          <Sider
            width={420}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
            }}
          ></Sider>
          <Content>
            <Search
              size="large"
              placeholder="find player..."
              onSearch={onSearch}
              style={{
                width: 400,
              }}
            />
          </Content>
          <Sider>
            <Button
              type="primary"
              block
              htmlType="submit"
              size="large"
              style={{ background: "#5A3E1E" }}
              onClick={handleToProfile}
            >
              Profile
            </Button>
          </Sider>
        </Layout>
      </Header>
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
                  fontSize: "18px",
                  height: "32px",
                }}
              >
                Last updated:{ShowTime()}
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
