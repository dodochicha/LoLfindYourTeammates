import { useQuery } from "@apollo/client";
import { GET_PLAYERS_QUERY, GET_INVITATIONS_QUERY } from "../graphql/queries";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import React from "react";
import { Table, Layout, Button, Typography, Input, Avatar, Badge } from "antd";
import { NotificationOutlined } from "@ant-design/icons";
import { RedoOutlined } from "@ant-design/icons";
import { columns } from "../utils/columns";
import Filter from "./Filter";
import InviteModal from "./InviteModal";
import InvitationModal from "./InvitationModal";
import axios from "../api";
import { useHook } from "../hooks/useHook";

const { Title } = Typography;
const { Header, Content, Sider, Footer } = Layout;

function Search() {
  const username = localStorage.getItem("username");
  const [laneFilter, setLaneFilter] = useState([]);
  const [rankFilter, setRankFilter] = useState([]);
  const [filter, setFilter] = useState({ name: "", lanes: [], rank: [] });
  const [nameFilter, setNameFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [invitationModalOpen, setInvitationModalOpen] = useState(false);
  const [playerInvited, setPlayerInvited] = useState("");
  const [invitationReadNum, setInvitationReadNum] = useState(0);
  const [myPlayerName, setMyPlayerName] = useState("");
  const { Search } = Input;
  const {
    loading,
    error,
    data: playersData,
    subscribeToMore,
  } = useQuery(GET_PLAYERS_QUERY, {
    variables: { filter: filter },
  });
  const { data: invitationsData } = useQuery(GET_INVITATIONS_QUERY);
  const findPlayerName = async () => {
    const {
      data: { message, status, id, name, lanes, heros, rank },
    } = await axios.get("/getProfile", {
      params: {
        username,
      },
    });
    if (name !== undefined) setMyPlayerName(name);
  };
  useEffect(() => {
    // console.log("username:", username);
    findPlayerName();
  }, []);
  useEffect(() => {
    // console.log("invitationsData:", invitationsData);
    if (invitationsData !== undefined) {
      // console.log("invitationsData:", invitationsData);
      var invitations = invitationsData.invitations.map((invitation) => ({
        ...invitation,
        key: invitation._id,
      }));
    } else {
      var invitations = [];
    }
    // console.log("myPlayerName:", myPlayerName);
    if (myPlayerName !== undefined) {
      const result = invitations.filter(
        (invitation) => invitation.to === myPlayerName
      );
      const checkedReadNum = (invitations) => {
        const read = invitations.filter((invitation) => !invitation.read);
        return read.length;
      };
      setInvitationReadNum(checkedReadNum(result));
    }
  }, [myPlayerName]);
  useEffect(() => {
    // console.log("invitationReadNum:", invitationReadNum);
  }, [invitationReadNum]);
  useEffect(() => {
    var newFilter = { ...filter, lanes: laneFilter };
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
    navigate(`/profile`);
  };
  const handleToLogOut = () => {
    navigate(`/`);
  };
  const handleInvite = (e) => {
    setModalOpen(true);
    setPlayerInvited(e.target.innerText.slice(7));
  };
  const handleInvitationModalOpen = () => {
    setInvitationModalOpen(true);
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
    <Layout>
      <Header
        style={{
          height: "80px",
          background: "rgba(255, 255, 255, 0)",
        }}
      >
        <Layout>
          <Header
            style={{
              height: "30px",
              background: "rgba(255, 255, 255, 0)",
            }}
          ></Header>
          <Layout>
            <Sider
              width={"23.5%"}
              style={{
                background: "rgba(255, 255, 255, 0)",
              }}
            ></Sider>
            <Content>
              <Search
                size="large"
                placeholder="find player..."
                onSearch={onSearch}
                style={{
                  width: 400,
                  background: "rgba(255, 255, 255, 0)",
                }}
              />
            </Content>
            <Content>
              <Badge count={invitationReadNum}>
                <Avatar
                  shape="square"
                  icon={
                    <NotificationOutlined
                      style={{ fontSize: "20px" }}
                      onClick={handleInvitationModalOpen}
                    />
                  }
                />
              </Badge>
            </Content>
            <Sider
              style={{
                background: "rgba(255, 255, 255, 0)",
              }}
            >
              <Button
                type="primary"
                block
                htmlType="submit"
                size="large"
                style={{ background: "#5A3E1E" }}
                onClick={handleToLogOut}
              >
                Log out
              </Button>
            </Sider>
            <Sider
              style={{
                background: "rgba(255, 255, 255, 0)",
              }}
            >
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
        </Layout>
      </Header>
      <InviteModal
        open={modalOpen}
        player={playerInvited}
        onCancel={() => {
          setModalOpen(false);
        }}
        setOpen={setModalOpen}
        myPlayerName={myPlayerName}
      />
      <InvitationModal
        open={invitationModalOpen}
        setOpen={setInvitationModalOpen}
        myPlayerName={myPlayerName}
        setInvitationReadNum={setInvitationReadNum}
      />
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          width={400}
          style={{
            background: "rgba(255, 255, 255, 0)",
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
            background: "rgba(255, 255, 255, 0)",
            height: "100%",
          }}
        >
          <Layout>
            <Sider
              width={45}
              style={{
                background: "rgba(255, 255, 255, 0)",
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
                background: "rgba(255, 255, 255, 0)",
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
          <Table
            columns={columns(handleInvite, myPlayerName)}
            dataSource={players}
            className="table"
          />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Search;
