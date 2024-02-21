import React, { useState } from "react";
import "../css/Sidebar.css"; // You can create a CSS file for styling

const Sidebar = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className={`sidebar ${toggled ? "toggled" : ""}`}>
      <button className="toggle-btn" onClick={() => setToggled(!toggled)}>
        Toggle
      </button>
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
