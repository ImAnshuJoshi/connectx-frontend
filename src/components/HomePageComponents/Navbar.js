import React, { useState } from "react";
import {
  BrowserRouter as Router,
  useRouteMatch,
  NavLink,
} from "react-router-dom";

import "../../styles/HomePage/Navbar.css";

import FormInput from "../signUpCompontents/FormInput";
import ImgStackHome from "./ImgStackHome";
import connectxlogo from "../../assets/_logo/svg/logo.svg";
import searchIcon from "../../assets/home/top_navbar/ic_search_icon.svg";

import homeImage from "../../assets/home/top_navbar/ic_home.svg";
import hoverHomeImage from "../../assets/home/top_navbar/h_ic_home.svg";
import activeHomeImage from "../../assets/home/top_navbar/a_ic_home.svg";

import queriesImage from "../../assets/home/top_navbar/ic_queries.svg";
import hoverQueriesImage from "../../assets/home/top_navbar/h_ic_queries.svg";
import activeQueriesImage from "../../assets/home/top_navbar/a_ic_queries.svg";

import connectionImage from "../../assets/home/top_navbar/ic_connections.svg";
import hoverConnectionImage from "../../assets/home/top_navbar/h_ic_connections.svg";
import activeConnectionImage from "../../assets/home/top_navbar/a_ic_connections.svg";

import messageImage from "../../assets/home/top_navbar/ic_messages.svg";
import hoverMessageImage from "../../assets/home/top_navbar/h_ic_messages.svg";
import activeMessageImage from "../../assets/home/top_navbar/a_ic_messages.svg";

import UserProfileDefaultIcon from "../../assets/profile/user_profile_default_icon.svg";

function Navbar() {
  let { url } = useRouteMatch();
  const [userInput, setUserInput] = useState({
    searchedText: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInput({ ...userInput, [name]: value });
  };

  const [navLocation, setNavLocation] = useState("home");

  return (
    <nav className="Navbar">
      <div className="HomeNavLeft">
        <img src={connectxlogo} alt="connectxlogo" className="ConnectxLogo" />
        <FormInput
          inputType="text"
          inputName="searchedText"
          inputValue={userInput.searchedText}
          lableContent={"Searched Something"}
          onChangeFunction={handleInput}
          style={{
            marginBottom: "0",
            marginLeft: "2vw",
            paddingLeft: "1.75vw",
            width: "24.9vw",
          }}
        />
        <img src={searchIcon} alt="searchicon" className="NavbarSearchIcon" />
      </div>
      <div className="HomeNavRight">
        <NavLink
          to={`${url}`}
          isActive={(match, location) => {
            setNavLocation(location.pathname);
          }}
        >
          <ImgStackHome
            normalImageSrc={homeImage}
            hoverImageSrc={hoverHomeImage}
            activeImageSrc={activeHomeImage}
            isActive={navLocation === "/home" ? true : false}
          />
        </NavLink>
        <NavLink to={`${url}/queries`}>
          <ImgStackHome
            normalImageSrc={queriesImage}
            hoverImageSrc={hoverQueriesImage}
            activeImageSrc={activeQueriesImage}
            isActive={navLocation === "/home/queries" ? true : false}
          />
        </NavLink>
        <NavLink to={`${url}/connection`}>
          <ImgStackHome
            normalImageSrc={connectionImage}
            hoverImageSrc={hoverConnectionImage}
            activeImageSrc={activeConnectionImage}
            isActive={navLocation === "/home/connection" ? true : false}
          />
        </NavLink>
        <NavLink to={`${url}/message`}>
          <ImgStackHome
            normalImageSrc={messageImage}
            hoverImageSrc={hoverMessageImage}
            activeImageSrc={activeMessageImage}
            isActive={navLocation === "/home/message" ? true : false}
          />
        </NavLink>

        <div className="NavbarUserProfile">
          <img
            src={UserProfileDefaultIcon}
            alt="user profile icon"
            className="NavbarUserProfile"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;