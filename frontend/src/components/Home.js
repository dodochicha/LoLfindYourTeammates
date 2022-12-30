import React from 'react';
import '../styles/Home.css';
import { Button, Space, Divider } from 'antd';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="HomePage">
        <h2 className="Header-Text"> Welcome back!  </h2>
        <h1 className="Header-Text-2">  Can't find a teammate? LOL! </h1>
        <div className="ButtonsContainer">
            <Space wrap>
                <Link to="/login">
                    <Button type="primary" size="large" style={{ background: "#5A3E1E" }} >
                        Sign in
                    </Button>
                </Link>
                <Link to="/register">
                    <Button type="primary" size="large" style={{ background: "#5A3E1E" }} >
                        Create account
                    </Button>
                </Link>
            </Space>
        </div>
    </div>
  );
}

export default HomePage;
