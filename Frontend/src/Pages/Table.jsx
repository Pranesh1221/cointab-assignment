import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Table() {
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [tag, setTag] = useState("");
  const [order, setOrder] = useState("");
  const [temp, setTemp] = useState([]);

  // <-------Pagination -------->

  const getUsersFun = async () => {
    let res = await fetch(
      `http://localhost:3030/getusers?page=${page}&limit=${limit}`
    );
    let daata = await res.json();
    setData(daata);
    setTemp(daata.users);
  };

  useEffect(() => {
    getUsersFun();
  }, [page, limit]);

  //<---------Filter ------------>
  const filterFunction = () => {
    let arr = [...temp];
    let brr = [];
    console.log(tag, order, arr);
    if (tag === "name") {
      brr = arr.filter((e, i) => {
        return e.name.first === order;
      });
    } else if (tag === "gender") {
      brr = arr.filter((e, i) => {
        return e.gender === order;
      });
    } else if (tag === "country") {
      brr = arr.filter((e, i) => {
        return e.location.country === order;
      });
    }
    let obj = { ...data };
    obj.users = brr;
    console.log(obj);
    setData(obj);
  };
  return (
    <div>
      <div className="navbar">
        <img
          src="https://www.cointab.in/wp-content/uploads/2021/06/cointab_green-1.png"
          alt="cointab"
        />
        <Link className="navbar" to={"/"}>
          Home Page
        </Link>
      </div>

      <div
        className="home-box"
        style={{ height: "auto", padding: "25px 0", flexDirection: "column" }}
      >
        <div>
          <select
            className="page-btn"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            <option value="">Select Tag</option>
            <option value="name">Name</option>
            <option value="gender">Gender</option>
            <option value="country">Country</option>
          </select>
          <input
            style={{ background: "none", margin: "0 15px" }}
            className="page-btn"
            type="text"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            placeholder="enter value"
          />
          <button className="page-btn" onClick={filterFunction}>
            Filter
          </button>
        </div>
        {data && (
          <div className="table-box">
            <table border={2}>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>City</th>
                <th>Country</th>
              </tr>
              {data.users.map((el, id) => {
                return (
                  <tr>
                    <td>{`${el.name.first} ${el.name.last}`}</td>
                    <td>{el.gender}</td>
                    <td>{el.email}</td>
                    <td>{el.phone}</td>
                    <td>{el.location.city}</td>
                    <td>{el.location.country}</td>
                  </tr>
                );
              })}
            </table>
            <div className="pagination">
              <select
                className="page-btn"
                disabled={page !== 1}
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              >
                <option value={10}>10</option>
                <option value={24}>24</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>

              <button
                className="page-btn"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Last Page
              </button>
              <span className="page-btn">{page}</span>
              <button
                className="page-btn"
                disabled={data.total / limit <= page}
                onClick={() => setPage(page + 1)}
              >
                Next Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Table;
