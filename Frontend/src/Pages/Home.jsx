import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const fetchUsersFun = () => {
    fetch("http://localhost:3030/fetchusers")
      .then((res) => res.text())
      .then((res) => console.log(res));
  };
  const deleteUsersFun = () => {
    fetch("http://localhost:3030/deleteusers", {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((res) => console.log(res));
  };
  return (
    <div className="home-css">
      <div className="navbar">
        <img
          src="https://www.cointab.in/wp-content/uploads/2021/06/cointab_green-1.png"
          alt="cointab"
        />
      </div>
      <div className="home-box">
        <button className="button-home" onClick={fetchUsersFun}>
          Fetch Users
        </button>
        <button className="button-home" onClick={deleteUsersFun}>
          Delete Users
        </button>
        <Link className="button-home" to={"/users"}>
          Users Details
        </Link>
      </div>
    </div>
  );
};

export default Home;
