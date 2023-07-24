import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IoPerson,
  IoPriceTag,
  IoHome,
  IoLogOut,
  IoPencil,
  IoSettings,
  IoPeople,
  IoAccessibility,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logOut, LoginUsers, reset } from "../../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(logOut());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">
          <IoAccessibility /> General
        </p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <IoHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/articles"}>
              <IoPencil /> article
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">
          <IoPeople /> Admin
        </p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/users"}>
              <IoPerson /> Users
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">
          <IoSettings /> Settings
        </p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> Log Out
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
