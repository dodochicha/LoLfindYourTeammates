import { Space, Table, Tag } from "antd";
import viewPlayer from "../components/Search";

const columns = (handleToPlayer, handelInvite, myPlayerName) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, { id, name }) => (
      <a onClick={() => handleToPlayer(id)}>{name}</a>
    ),
  },
  {
    title: "Rank",
    dataIndex: "rank",
    key: "rank",
  },
  {
    title: "Lane",
    key: "lane",
    dataIndex: "lane",
    render: (_, { lanes }) => (
      <>
        {lanes.map((tag) => (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: "Hero",
    key: "heros",
    dataIndex: "heros",
    render: (_, { heros }) => (
      <>
        {heros.map((tag) => (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle" onClick={handelInvite}>
        {myPlayerName === record.name ? <></> : <a>Invite {record.name}</a>}
      </Space>
    ),
  },
];

export { columns };
