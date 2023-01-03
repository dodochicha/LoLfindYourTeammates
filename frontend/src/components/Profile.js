import { useMutation } from "@apollo/client";
import {
  CREATE_PLAYER_MUTATION,
  UPDATE_PLAYER_MUTATION,
} from "../graphql/mutations";
import {
  Link,
  useMatch,
  useResolvedPath,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { Form, Input, Select, Button, Layout, Space, Modal } from "antd";
import heroes_eng from "../utils/heros_eng";
import heroes from "../utils/heros";
import "../styles/Profile.css";
import axios from "../api";
import { useHook } from "../hooks/useHook";

function Profile() {
  const { username, setUsername } = useHook();
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [lanes, setLanes] = useState([]);
  const [heros, setHeros] = useState([]);
  const [rank, setRank] = useState("");
  const [formExist, setFormExist] = useState(false);

  const [createPlayer] = useMutation(CREATE_PLAYER_MUTATION);
  const [updatePlayer] = useMutation(UPDATE_PLAYER_MUTATION);

  const { Header, Content, Sider, Footer } = Layout;
  const navigate = useNavigate();

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const onLaneChange = (value) => {
    setLanes(value);
  };

  const onHerosChange = (value) => {
    setHeros(value);
  };

  const onRankChange = (value) => {
    setRank(value);
  };

  const handleQuery = async () => {
    const {
      data: { message, status, id, name, lanes, heros, rank },
    } = await axios.get("/getProfile", {
      params: {
        username,
      },
    });
    console.log(message, status, id, name, lanes, heros, rank);
    if (status === "Filled") {
      setFormExist(true);
      setID(id);
      setName(name);
      setLanes(lanes);
      setHeros(heros);
      setRank(rank);
    }
    // if(status === "Error"){
    //   Modal.error({
    //     title: 'This is an error message!',
    //     content: message
    //   });
    // }
    // else{
    //   navigate("/");
    // }
  };

  useEffect(() => {
    console.log("use effect........");
    handleQuery();
  }, []);

  const [form] = Form.useForm();
  const { Option } = Select;
  const onFinish = (values) => {
    console.log(
      "Success:",
      values.PlayerID,
      values.SelectLanes,
      values.SelectChamps,
      values.SelectRank
    );

    if (!formExist) {
      var playerId = uuidv4();
      createPlayer({
        variables: {
          input: {
            id: playerId,
            name: values.PlayerID,
            lanes: values.SelectLanes,
            heros: values.SelectChamps,
            rank: values.SelectRank,
          },
        },
      });
    } else {
      // updatePlayer({
      //   variables: {
      //     input: {
      //       id: id,
      //       name: values.PlayerID,
      //       lane: values.SelectLanes,
      //       heros: values.SelectChamps,
      //       rank: values.SelectRank,
      //     },
      //   },
      // });
    }
    navigate("/search");
  };
  const onReset = () => {
    form.resetFields();
    setName("");
    setLanes([]);
    setHeros([]);
    setRank("");
  };

  const handleToSearch = () => {
    navigate("/search");
  };

  return (
    <div className="ProfilePage">
      <div className="Prof-Container">
        <div className="Prof-Form">
          <Space
            direction="horizontal"
            size={230}
            style={{ paddingBottom: "5%" }}
          >
            <Header className="Prof-Text"> {username}'s Profile </Header>
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
          </Space>
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
              <Input onChange={handleChange(setName)} defaultValue={name} />
            </Form.Item>
            <Form.Item
              name="SelectLanes"
              label="Main Roles 擅長路線"
              rules={[
                {
                  required: true,
                  message: "Please select your main roles!",
                  type: "array",
                },
              ]}
              tooltip="You can choose more than 1."
            >
              <Select
                mode="multiple"
                onChange={onLaneChange}
                placeholder="Please select your main roles!"
                defaultValue={lanes}
              >
                <Option value="Top">Top</Option>
                <Option value="Jungle">Jungle</Option>
                <Option value="Mid">Middle</Option>
                <Option value="Bottom">Bottom</Option>
                <Option value="Support">Support</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="SelectChamps"
              label="Main Champions 擅長英雄"
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
                onChange={onHerosChange}
                placeholder="Please select your main champions!"
                defaultValue={heros}
              >
                {heroes.map((hero, index) => (
                  <Option value={hero}>{heroes_eng[index]}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="SelectRank"
              label="Rank"
              rules={[{ required: true, message: "Please select your rank!" }]}
              tooltip="Your rank."
            >
              <Select
                placeholder="Please select your rank"
                onChange={onRankChange}
                defaultValue={rank}
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
            <Form.Item
              wrapperCol={{
                offset: 10,
                span: 20,
              }}
            >
              <Button type="primary" htmlType="submit" size="large">
                Submit
              </Button>
              <Button htmlType="button" size="large" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

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

export default Profile;
