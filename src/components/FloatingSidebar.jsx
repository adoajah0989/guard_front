// FloatingSidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const FloatingSidebar = () => {
  return (
    <div className="sb">
      <Sidebar width="150px" >
        <Menu>
          <MenuItem component={<Link to="/Tamu" />}>Tamu</MenuItem>
          <MenuItem component={<Link to="/patroli" />}>Patroli</MenuItem>
          <MenuItem component={<Link to="/inout" />}> in-OUT</MenuItem>
          <MenuItem component={<Link to="/lapdi" />}>Lapdi</MenuItem>
          <MenuItem component={<Link to="/Mutasi" />}>Mutasi</MenuItem>
          <MenuItem component={<Link to="/bap" />}>B A P</MenuItem>
          <MenuItem component={<Link to="/asset" />}>Asset</MenuItem>
          <MenuItem component={<Link to="/ekspedisi" />}>Ekspedisi</MenuItem>
          <MenuItem component={<Link to="/darurat" />}>Darurat</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default FloatingSidebar;
