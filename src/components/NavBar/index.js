import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const links = [
  {
    to: "/schedule",
    icon: "Images/schedule.png",
    text: "Schedule"
  },
  {
    to: "/leaderboard",
    icon: "Images/leaderboard.png",
    text: "Leaderboard"
  },
];
const NavBar = () => {
  return (
    <nav>
      <ul className="navList">
        {links.map((link) => {
          return (
            <ol key={link.text} className="navItem">
              <NavLink className="navLink" to={link.to}>
                <img src={link.icon} height={25} alt="icon" />
                <span>{link.text}</span>
              </NavLink>
            </ol>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;