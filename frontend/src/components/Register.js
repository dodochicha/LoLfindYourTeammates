import React from 'react';
import '../styles/Register.css';
import { useState } from 'react';
import { Button, Form, Input, Space, Modal, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, ArrowRightOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom';
import axios from '../api';

function Register() {
  // const [passwordVisible, setPasswordVisible] = useState(false);
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ password2, setPassword2 ] = useState('')

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

  const handleNewUser = async () => {
    const {
      data: { message, status, account_type },
    } = await axios.post('/newUser', {
      username,
      password,
      password2,
    });

    console.log(message, status, account_type)
    if(status === "Error"){
      Modal.error({
        title: 'This is an error message!',
        content: message
      });
    }
    else{
      navigate("/login");
    }
  };
  
  return (
    <div className="RegisterPage">
        {/* <h1 className="Reg-Text"> Create Account </h1> */}
        <div className="Reg-Container">
          <div className="Reg-Form">
            <h1 className="Reg-Text"> Create Account </h1>
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
                <Form.Item
                    name="password2"
                    validateTrigger="onBlur"
                    rules={[
                        { required: true, 
                          message: 'Please re-input your password!' 
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject('Please make sure your passwords match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Confirm password"
                    size="large"
                    onChange={handleChange(setPassword2)}
                    />
                </Form.Item>
                <Form.Item>
                    <Space direction="horizontal" size={100}>
                        <MyLinks to="/login" className="login-form-have-account">
                            Already have an account? Sign in here!
                        </MyLinks>
                        <Form.Item style={{ display: "inline"}} ></Form.Item>
                    </Space>
              </Form.Item>
              
              <Form.Item
                // wrapperCol={{
                //   offset: 10,
                //   span: 20,
                // }}
              >
                <Button type="primary" block htmlType="submit" size="large" style={{ background: "#5A3E1E" }} onClick={handleNewUser} >
                  Create account
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

export default Register;