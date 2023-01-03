import React from 'react';
import '../styles/Font.css';
import '../styles/Home.css';
import { Button, Space, Divider } from 'antd';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
        <div className="Home-Image-Background">
            <div className="Background"></div>
            <div className="Gradient"></div>
        </div>
        <div className="Login-Background">
            <div className="Login-Frame">
                <div className="Login">
                    <div className="Header-Frame"> <p className="Header-Text">go and find your teammates</p></div>
                    <Link to="/login">
                        <Button className="Button-Frame">
                            Sign In
                        </Button>
                    </Link>
                    <div className="Footer-Frame">
                        Don’t have an account yet ?
                        <Link className="Footer-Link" to="/register">
                            Register Now
                        </Link>
                    </div>
                        {/* </Space> */}
                    {/* </div> */}
                </div>
            </div>
        </div>
    </div>
  );
}

export default HomePage;
