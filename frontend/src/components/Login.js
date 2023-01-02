import React from "react";
import "../styles/Login.css";
import { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Space, Modal } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  ArrowRightOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import axios from "../api";

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

function Login() {
  console.log("login...");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("save-me", username);
  }, [username]);
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleUserLogin = async () => {
    const {
      data: { message, status },
    } = await axios.post("/userLogin", {
      username,
      password,
    });

    console.log(message, status);
    if (status === "Error") {
      Modal.error({
        title: "This is an error message!",
        content: message,
      });
    } else {
      navigate("/search");
    }
  };

  return (
    <div className="Image-Background">
      {/* <h1 className="Reg-Text"> Create Account </h1> */}
      <div className="header"></div>
      <div className="Form-Container">
        <div className="Form-Background">
          <h1 className="Form-Header"> Log in </h1>
          <Form
            className="Forms-Frame"
            name="basic"
            form={form}
            // wrapperCol={{
            //   span: 16,
            // }}
            initialValues={{
              remember: true,
            }}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              className="Form-Frame"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <h2 className="Form-Name">Email</h2>
              <Input
                className="Form-Box"
                // prefix={<UserOutlined className="site-form-item-icon" />}
                // placeholder="Username"
                // size="large"
                onChange={handleChange(setUsername)}
              />
            </Form.Item>
            <Form.Item
              className="Form-Frame"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <h2 className="Form-Name">Password</h2>
              <Input.Password
                className="Form-Box"
                // prefix={<LockOutlined className="site-form-item-icon" />}
                // type="password"
                // placeholder="Password"
                // size="large"
                onChange={handleChange(setPassword)}
              />
            </Form.Item>

            <Form.Item
              className="Footer-Form-Frame">
                {/* <Space direction="horizontal" size={100}> */}
                <Form.Item
                  // style={{ display: "inline" padding-bottom: 2%;}}
                  name="remember"
                  valuePropName="checked"
                  // nostyle
                >
                  <Checkbox className="Form-Footer-Name">Remember me</Checkbox>
                </Form.Item>
              <Space direction="vertical" size={1}>
                <MyLinks to="/login" className="Form-Footer-Name-2">
                  Forgot Password
                </MyLinks>
                {/* </Space> */}

                <MyLinks to="/register" className="Form-Footer-Name-2">
                  Don't have an account? Create account here!
                </MyLinks>
              </Space>
            </Form.Item>

            <Form.Item
              className="Button"
            // wrapperCol={{
            //   offset: 10,
            //   span: 20,
            // }}
            >
              <Button
                className="Button-Color"
                type="primary"
                block
                htmlType="submit"
                size="large"
                // style={{ background: "#5A3E1E" }}
                onClick={handleUserLogin}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="Footer"></div>
    </div>
  );
}

function MyLinks({ to, className, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Link to={to} className={className} {...props}>
      {children}
    </Link>
  );
}

export default Login;