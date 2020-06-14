import React from "react";
import TwitterLogo from "../TwitterLogo.png"

const Logo = () => {
    return (
        <div className={"App-logo"}>
            <a href="/">
                <img src={TwitterLogo} alt="Logo" className={"logo"}/>
            </a>
        </div>
    )
}

export default Logo