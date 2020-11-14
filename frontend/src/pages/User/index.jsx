import React, { useState, useEffect } from "react";
import to from "await-to-js";
import userService from "../../services/userService";
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetch() {
      let [error, users] = await to(userService().withAuth().index());
      console.log("users ", users);
    }
    fetch();
    // code to run on component mount
  }, []);
  return <div>Màn user</div>;
};

export default Dashboard;
