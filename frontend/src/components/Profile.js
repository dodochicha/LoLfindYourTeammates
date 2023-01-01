import { useMutation } from "@apollo/client";
import {
  CREATE_PLAYER_MUTATION,
  UPDATE_PLAYER_MUTATION,
} from "../graphql/mutations";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Form, Input, Select } from 'antd';
import heros from "../utils/heros_eng";

function Profile() {
  const [ID , setID] = useState("")
  const [lanes , setLanes] = useState([])
  const [champs , setChamps] = useState([])
  const [rank , setRank] = useState("")
  const [createPlayer] = useMutation(CREATE_PLAYER_MUTATION);
  const [updatePlayer] = useMutation(UPDATE_PLAYER_MUTATION);
  const handleSubmit = (formData) => {
    if (formData.name === "" || formData.lane === [] || formData.heros === []) {
      setErrors({
        name: !formData.name,
        lane: !formData.lane,
        heros: !formData.heros,
      });
      return;
    }
    if (1) {
      //player first write his/her profile
      createPlayer({
        variables: {
          input: {
            id: uuidv4(),
            ...formData,
          },
        },
      });
    } else {
      updatePlayer({
        variables: {
          input: {
            id: uuidv4(),
            ...formData,
          },
        },
      });
    }
  };
  const sanitizedDefaultFormData = {
    name: "",
    lane: [],
    heros: [],
    rank: "鐵",
  };

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

  const [formData, setFormData] = useState(sanitizedDefaultFormData);
  const [errors, setErrors] = useState({
    name: false,
    lane: false,
    heros: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    console.log('Success:', values);
  };

  return (
    <div className="ProfilePage">
      <div className="Prof-Container">
          <div className="Prof-Form">
            <h1 className="Prof-Text"> My Profile </h1>

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
                    message: 'Please input your Player ID',
                  },
                ]}
                tooltip="Your in-game name."
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="Select-lanes"
                label="Main lanes 擅長路線"
                rules={[{ required: true, message: 'Please select your main lanes!', type: 'array' }]}
                tooltip="You can choose more than 1."
              >
                <Select mode="multiple" value = {lanes} placeholder="Please select your main lanes!">
                  <Option value="top">Top</Option>
                  <Option value="jungle">Jungle</Option>
                  <Option value="mid">Middle</Option>
                  <Option value="bottom">Bottom</Option>
                  <Option value="support">Support</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Select-champs"
                label="Main champions 擅長英雄"
                rules={[{ required: true, message: 'Please select your main champions!', type: 'array' }]}
                tooltip="You can choose more than 1."
              >
                <Select mode="multiple" value = {lanes} placeholder="Please select your main champions!">
                  {heros.map((hero) =>
                    <Option value={hero}>{hero}</Option>
                  )}
                </Select>
              </Form.Item>
              <Form.Item
                name="Select-rank"
                label="Rank"
                rules={[{ required: true, message: 'Please select your rank!' }]}
                tooltip="Your rank."
              >
                <Select placeholder="Please select your rank">
                  <Option value="iron">Iron 鐵</Option>
                  <Option value="bronze">Bronze 銅</Option>
                  <Option value="silver">Silver 銀</Option>
                  <Option value="gold">Gold 金</Option>
                  <Option value="plat">Platinum 白金</Option>
                  <Option value="diamond">Diamond 鑽石</Option>
                  <Option value="master">Master 夭師</Option>
                  <Option value="grand">Grandmaster 宗師</Option>
                  <Option value="challenger">Challenger 菁英</Option>
                </Select>
              </Form.Item>
            </Form>
              <button>Profile</button>

          </div>
      </div>
    </div>
  );
}

export default Profile;
