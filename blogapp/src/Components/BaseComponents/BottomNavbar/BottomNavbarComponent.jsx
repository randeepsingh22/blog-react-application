import React from "react";
import logoImage from "../../../Utils/blog.png";
import "../BottomNavbar/BottomNavbarComponent.css";
export default function BottomNavbarComponent(props) {
  const { title } = props;
  return (
    <div className="main-bottom-vw">
      <div className="title-view">
        <img src={logoImage} alt="Blog Dekho" className="logo-image" />
        <h3 className="title-name">{title}</h3>
        <div className="copy-right">©Copyright. All Rights Reserved.</div>
      </div>
    </div>
  );
}
