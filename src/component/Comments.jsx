import React from "react";
import axios from "axios";
import { useState } from "react";

function comments() {
  const [list, setList] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (row) => {
    if (!row) {
      return list;
    }
    setSortDirection((sort) => (sort === "asc" ? "desc" : "asc"));
    if (sortDirection === "asc") {
      const data = list.sort((a, b) => b[row] - a[row]);
      setList(data);
    } else {
      const data = list.reverse();
      setList(data);
    }
  };

  const handleComment = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then(function (response) {
        setList(response.data);
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  return (
    <div>
      <button onClick={handleComment}>comments</button>
      <table>
        <thead>
          <tr>
            <th onClick={handleSort}>ID</th>
            <th onClick={handleSort}>UserId</th>
            <th onClick={handleSort}>Title</th>
          </tr>
        </thead>
        <tbody>
          {list.map((post) => (
            <tr key={post.id}>
              <th>{post.id}</th>
              <th>{post.userId}</th>
              <th>{post.title}</th>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div>
        {list.map((post) => {
          return <p key={post.id}>{post.title}</p>;
        })}
      </div> */}
    </div>
  );
}

export default comments;
