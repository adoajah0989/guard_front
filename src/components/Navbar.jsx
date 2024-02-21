import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import "../css/style.css";
import { jwtDecode } from "jwt-decode";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";

const NavBar = () => {
  const history = useHistory();
  const whiteText = { color: "white" };
  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      console.log(decoded);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        history.push("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        console.log(decoded);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  };

  return (
    <Navbar bg="007BA7" variant="" sticky="top" expand="md" className="p-2">
      <Navbar.Brand as={NavLink} to="/dashboard">
        <img
          width="40"
          height="40"
          src="https://img.icons8.com/dusk/64/shield.png"
          alt="shield"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-white" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/dashboard" className="nav-link" style={whiteText}>
            Home
          </NavLink>
          <div className="text-white">
            <NavDropdown
              title={<span className="text-white">More</span>}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>About</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/bantuan.pdf" download="bantuan.pdf">
                Bantuan
              </NavDropdown.Item>
              <NavDropdown.Item onClick={Logout}>Log out</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Nav>
        <span className="text-white is-bold mr-3">Hello, {name}</span>
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/bubbles/50/gender-neutral-user.png"
          alt="gender-neutral-user"
        />
        
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
