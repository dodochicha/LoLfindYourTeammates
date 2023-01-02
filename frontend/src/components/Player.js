import React from "react";
import '../styles/Player.css';

function Player () {

    return (
        <div className="Player-Background">
            <div className="Player-Profile-Frame">
                <div className="Player-Profile-Picture-Frame">
                    {/*TODO: change to user's profile image*/}
                    <img className="Player-Profile-Picture" src={require("../images/face.jpeg")}/>
                </div>
                <div className="Player-Profile-Bio-Frame">
                    <div className="Player-Profile-Name-Frame">
                        {/*TODO: change to user's profile name*/}
                        <h1 className="Player-Profile-Name">Beatrice</h1>
                        {/*TODO: change to user's profile hero type*/}
                        <img className="Player-Profile-Type" src={require("../images/mid.png")}></img>
                    </div>
                    {/*TODO: change to user's bio*/}
                    <p className="Player-Profile-Bio">Hello there! I am a new master, great in wars!</p>
                    {/*TODO: change to user's facebook page*/}
                    <a className="Player-Facebook-Frame" href="https://www.facebook.com/janice.herman.37/"><img className="Player-Facebook" src={require("../images/facebook.png")} /></a>
                </div>
                <div className="Player-Profile-Rank">
                    {/*TODO: change to user's rank*/}
                    <img className="Player-Profile-Rank-Image" src={require("../images/Iron4.png")}/>
                </div>
            </div>
            <div className="Player-Heroes-Frame-Gradient1"> </div>
            <div className="Player-Heroes-Frame">
                <div className="Player-Heroes-Profile">
                    {/*TODO: change to user's heroes (use map)*/}
                    <img className="Player-Hero-Image" src={require("../images/aurelion.jpg")} />
                    <h1 className="Player-Hero-Name">Aurelion</h1>
                </div>
            </div>
        </div>
    )
}

export default Player;