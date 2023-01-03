import { useQuery } from "@apollo/client";
import { GET_PLAYERS_QUERY } from "../graphql/queries";
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
  const { username } = useParams();
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
    console.log("username:", username);
    findPlayerName();
  }, []);
  useEffect(() => {
    console.log(myPlayerName);
  }, [myPlayerName]);
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
  // useEffect(() => console.log(filter), [filter]);
  const {
    loading,
    error,
    data: playersData,
    subscribeToMore,
  } = useQuery(GET_PLAYERS_QUERY, {
    variables: { filter: filter },
  });
  const navigate = useNavigate();
  // useEffect(() => console.log(players), [players]);
  if (playersData !== undefined) {
    var players = playersData.players.map((player) => ({
      ...player,
      key: player.id,
    }));
  } else {
    players = [];
  }
  const handleToProfile = () => {
    navigate(`/profile/${username}`, {
      state: {
        username,
      },
    });
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

// import { useQuery } from "@apollo/client";
// import { GET_PLAYERS_QUERY } from "../graphql/queries";
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import React from "react";
// import { Table, Layout, Button, Typography, Input } from "antd";
// import { UserOutlined, RedoOutlined } from "@ant-design/icons";
// import { columns } from "../utils/columns";
// import Filter from "./Filter";
// import InviteModal from "./InviteModal";
// import { borderRadius } from "@mui/system";

// import "../styles/Search.css";
// import { requirePropFactory } from "@mui/material";

// const { Title } = Typography;
// const { Header, Content, Sider, Footer } = Layout;

// function Search() {
//   const { username } = useParams();
//   const [laneFilter, setLaneFilter] = useState([]);
//   const [rankFilter, setRankFilter] = useState([]);
//   const [filter, setFilter] = useState({ name: "", lanes: [], rank: [] });
//   const [nameFilter, setNameFilter] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [invitationModalOpen, setInvitationModalOpen] = useState(false);
//   const [playerInvited, setPlayerInvited] = useState("");
//   const [invitationReadNum, setInvitationReadNum] = useState(0);
//   const [myPlayerName, setMyPlayerName] = useState("");
//   const { Search } = Input;
//   const findPlayerName = async () => {
//     const {
//       data: { message, status, id, name, lanes, heros, rank },
//     } = await axios.get("/getProfile", {
//       params: {
//         username,
//       },
//     });
//     if (name !== undefined) setMyPlayerName(name);
//   };
//   useEffect(() => {
//     console.log("username:", username);
//     findPlayerName();
//   }, []);
//   useEffect(() => {
//     console.log(myPlayerName);
//   }, [myPlayerName]);
//   useEffect(() => {
//     var newFilter = { ...filter, lanes: laneFilter };
//     setFilter(newFilter);
//   }, [laneFilter]);
//   useEffect(() => {
//     var newFilter = { ...filter, rank: rankFilter };
//     setFilter(newFilter);
//   }, [rankFilter]);
//   useEffect(() => {
//     var newFilter = { ...filter, name: nameFilter };
//     setFilter(newFilter);
//   }, [nameFilter]);
//   // useEffect(() => console.log(filter), [filter]);
//   const {
//     loading,
//     error,
//     data: playersData,
//     subscribeToMore,
//   } = useQuery(GET_PLAYERS_QUERY, {
//     variables: { filter: filter },
//   });
//   const navigate = useNavigate();
//   // useEffect(() => console.log(players), [players]);
//   if (playersData !== undefined) {
//     var players = playersData.players.map((player) => ({
//       ...player,
//       key: player.id,
//     }));
//   } else {
//     players = [];
//   }
//   const handleToProfile = () => {
//     navigate(`/profile/${username}`, {
//       state: {
//         username,
//       },
//     });
//   };
//   const handleInvite = (e) => {
//     setModalOpen(true);
//     setPlayerInvited(e.target.innerText.slice(7));
//   };
//   const handleInvitationModalOpen = () => {
//     setInvitationModalOpen(true);
//   };
//   const ShowTime = () => {
//     var NowDate = new Date();
//     var h = ("00" + NowDate.getHours()).slice(-2);
//     var m = ("00" + NowDate.getMinutes()).slice(-2);
//     var s = ("00" + NowDate.getSeconds()).slice(-2);
//     return `${h}:${m}:${s}`;
//   };
//   const onSearch = (value) => setNameFilter(value);

//   return (
//     <div className="Search-Layout">
//       <div className="Search-Header">
//         {/* <div className="Search-Header-Left"></div> */}
//         <div className="Search-Header-Center">
//           <div className="Search-Header-Center-Sider"></div>
//           <div className="Search-Header-Center-Content">
//             <Search
//               className="Header-Search-Bar"
//               size="large"
//               // placeholder="find player..."
//               onSearch={onSearch}
//             />
//           </div>
//         </div>
//         <div className="Search-Header-Right">
//           <Button
//             type="primary"
//             block
//             htmlType="submit"
//             shape="circle"
//             size="large"
//             className="Search-Header-Button"
//             onClick={handleToProfile}
//           >
//             {/* Profile */}
//             {/* <img url={require("../images/face.jpeg")} /> */}
//             <UserOutlined />
//           </Button>
//         </div>
//       </div>
//       <InviteModal
//         open={modalOpen}
//         player={playerInvited}
//         onCancel={() => {
//           setModalOpen(false);
//         }}
//         setOpen={setModalOpen}
//         myPlayerName={myPlayerName}
//       />
//       <InvitationModal
//         open={invitationModalOpen}
//         setOpen={setInvitationModalOpen}
//         myPlayerName={myPlayerName}
//         setInvitationReadNum={setInvitationReadNum}
//       />
//       <div className="Search-Content">
//         <div className="Search-Content-Left">
//             <Filter
//               laneFilter={laneFilter}
//               setLaneFilter={setLaneFilter}
//               rankFilter={rankFilter}
//               setRankFilter={setRankFilter}
//             />
//         </div>
//         <div className="Search-Content-Right">
//             <div className="Search-Content-Right-Header">
//               <Button
//                 icon={<RedoOutlined />}
//                 onClick={() => window.location.reload()}
//               />
//               <div
//                 className="Search-Content-Right-Header-Text"
//               >
//                 Last updated:{ShowTime()}
//               </div>
//             </div>
//             <div className="Search-Content-Right-Table">
//               <Table
//                 columns={columns(handleInvite)}
//                 dataSource={players}
//                 className="table"
//               />
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Search;

