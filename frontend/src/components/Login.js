import React from 'react';
import '../styles/Login.css';
import { useState } from 'react';
import { Button, Checkbox, Form, Input, Space, Modal } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, ArrowRightOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom';
import axios from '../api';

function Login() {
  console.log("login...")
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleUserLogin = async () => {
    const {
      data: { message, status},
    } = await axios.post('/userLogin', {
      username,
      password,
    });

    console.log(message, status)
    if(status === "Error"){
      Modal.error({
        title: 'This is an error message!',
        content: message
      });
    }
    else{
      navigate("/");
    }
  };

  return (
    <div className="LoginPage">
        {/* <h1 className="Reg-Text"> Create Account </h1> */}
        <div className="Login-Container">
          <div className="Login-Form">
            <h1 className="Login-Text"> Log in </h1>
            <Form
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
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" size="large" onChange={handleChange(setUsername)}/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    size="large"
                    onChange={handleChange(setPassword)}
                    />
                </Form.Item>
            
                <Form.Item>
                    <Space direction="vertical">
                        <Space direction="horizontal" size={100}>
                        <Form.Item
                            style={{ display: "inline" }}
                            name="remember"
                            valuePropName="checked"
                            nostyle
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <MyLinks to="/login" className="login-form-have-account">
                            Forgot Password
                        </MyLinks>
                        </Space>

                        <MyLinks to="/register" className="register-form-no-account">
                            Don't have an account? Create account here!
                        </MyLinks>
                    </Space>
                </Form.Item>
              
              <Form.Item
                // wrapperCol={{
                //   offset: 10,
                //   span: 20,
                // }}
              >
                <Button type="primary" block htmlType="submit" size="large" style={{ background: "#5A3E1E" }} onClick={handleUserLogin}>
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
    </div>
  );
}

function MyLinks({to, className, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: true });
  
  return(
        <Link to={to} className={className} {...props}>
            {children}
        </Link>
  )
}

export default Login;