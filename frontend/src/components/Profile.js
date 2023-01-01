import { useMutation } from "@apollo/client";
import {
  CREATE_PLAYER_MUTATION,
  UPDATE_PLAYER_MUTATION,
} from "../graphql/mutations";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { Form, Input, Select, Button, Layout } from "antd";
import heros_eng from "../utils/heros_eng";
import heros from "../utils/heros";

const { Header, Content, Sider, Footer } = Layout;

function Profile() {
  const [ID, setID] = useState("");
  const [lanes, setLanes] = useState([]);
  const [champs, setChamps] = useState([]);
  const [rank, setRank] = useState("");
  const [createPlayer] = useMutation(CREATE_PLAYER_MUTATION);
  const [updatePlayer] = useMutation(UPDATE_PLAYER_MUTATION);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const navigate = useNavigate();
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  // const handleSelectAll = (value) => {
  //   if (value.includes('all')) {
  //     setLanes(['Top', 'Jungle', 'Middle', 'Bottom', 'Support'])
  //   } else {
  //     setLanes({value})
  //   }
  // }

  const [form] = Form.useForm();
  const { Option } = Select;
  const onFinish = (values) => {
    console.log(
      "Success:",
      values.PlayerID,
      values.Select_lanes,
      values.Select_champs,
      values.Select_rank
    );

    if (true) {
      //user.player === undefined
      var playerId = uuidv4();
      createPlayer({
        variables: {
          input: {
            id: playerId,
            name: values.PlayerID,
            lane: values.Select_lanes,
            heros: values.Select_champs,
            rank: values.Select_rank,
          },
        },
      });
    } else {
      // updatePlayer({
      //   variables: {
      //     input: {
      //       id: user.player.id,
      //       name: values.PlayerID,
      //       lane: values.Select_lanes,
      //       heros: values.Select_champs,
      //       rank: values.Select_rank,
      //     },
      //   },
      // });
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  const handleToSearch = () => {
    navigate("/search");
  };

  return (
    <div className="ProfilePage">
      <div className="Prof-Container">
        <div className="Prof-Form">
          <h1 className="Prof-Text"></h1>
          <Header>
            <Layout>
              <Content style={{ fontSize: 28 }}>
                {" "}
                {localStorage.getItem("save-me")}'s Profile{" "}
              </Content>
              <Sider style={{ background: "#5A3E1E" }}>
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  size="large"
                  style={{ background: "#5A3E1E" }}
                  onClick={handleToSearch}
                >
                  Search
                </Button>
              </Sider>
            </Layout>
          </Header>
          <Form
            {...formItemLayout}
            form={form}
            name="myProfile"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="PlayerID"
              label="Player ID 名字"
              rules={[
                {
                  required: true,
                  message: "Please input your Player ID",
                },
              ]}
              tooltip="Your in-game name."
            >
              <Input value={ID} onChange={(value) => setID(value)} />
            </Form.Item>
            <Form.Item
              name="Select_lanes"
              label="Main lanes 擅長路線"
              rules={[
                {
                  required: true,
                  message: "Please select your main lanes!",
                  type: "array",
                },
              ]}
              tooltip="You can choose more than 1."
            >
              <Select
                mode="multiple"
                value={lanes}
                placeholder="Please select your main lanes!"
                onChange={(value) => {
                  setLanes(value);
                  console.log(lanes);
                }}
              >
                <Option value="Top">Top</Option>
                <Option value="Jungle">Jungle</Option>
                <Option value="Middle">Middle</Option>
                <Option value="Bottom">Bottom</Option>
                <Option value="Support">Support</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="Select_champs"
              label="Main champions 擅長英雄"
              rules={[
                {
                  required: true,
                  message: "Please select your main champions!",
                  type: "array",
                },
              ]}
              tooltip="You can choose more than 1."
            >
              <Select
                mode="multiple"
                value={champs}
                placeholder="Please select your main champions!"
                onChange={(value) => setChamps(value)}
              >
                {heros.map((hero, index) => (
                  <Option value={hero}>{heros_eng[index]}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="Select_rank"
              label="Rank"
              rules={[{ required: true, message: "Please select your rank!" }]}
              tooltip="Your rank."
            >
              <Select
                placeholder="Please select your rank"
                value={rank}
                onChange={(value) => setRank(value)}
              >
                <Option value="鐵">Iron 鐵</Option>
                <Option value="銅">Bronze 銅</Option>
                <Option value="銀">Silver 銀</Option>
                <Option value="金">Gold 金</Option>
                <Option value="白金">Platinum 白金</Option>
                <Option value="鑽石">Diamond 鑽石</Option>
                <Option value="大師">Master 大師</Option>
                <Option value="宗師">Grandmaster 宗師</Option>
                <Option value="菁英">Challenger 菁英</Option>
              </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
