import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditUsers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUsersById = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setAddress(response.data.address);
        setPassword(response.data.password);
        setConfPassword(response.data.confPassword);
        setRole(response.role);
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.serverMessage);
        }
      }
    };
    getUsersById();
  }, [id]);

  const updateUsers = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:4000/users/${id}`, {
        name: name,
        email: email,
        address: address,
        password: password,
        confPassword: confPassword,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.serverMessage);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Update Users</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateUsers}>
              <p className="has-text-centered">{message}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="input"
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="input"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Adress</label>
                <div className="control">
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    className="input"
                    placeholder="Adress"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={role}
                      onChange={(e) => setRole((e) => setRole(e.target.value))}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">Users</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="input"
                    placeholder="******"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    type="password"
                    className="input"
                    placeholder="******"
                  />
                </div>
              </div>
              <div className="field mt-5">
                <div className="control">
                  <button type="sumbit" className="button is-success">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditUsers;
