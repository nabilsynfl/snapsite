import React from "react";
import { NavLink } from "react-router-dom";
import {
  IoPerson,
  IoPriceTag,
  IoHome,
  IoLogOut,
  IoPencil,
  IoSettings,
  IoPeople,
  IoAccessibility
} from "react-icons/io5";

const Sidebar = () => {
  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label"><IoAccessibility /> General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <IoHome />  Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/articles"}>
              <IoPencil /> article
            </NavLink>
          </li>
        </ul>
        <p className="menu-label"><IoPeople /> Admin</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/users"}><IoPerson /> Users</NavLink>
          </li>
        </ul>
        <p className="menu-label"><IoSettings /> Settings</p>
        <ul className="menu-list">
          <li>
            <button className="button is-white"><IoLogOut /> Log Out</button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
