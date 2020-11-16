import React, { useState, useEffect } from "react";
import to from "await-to-js";
import userService from "@services/userService";
import { Table, Tag, Space } from "antd";
import useBaseHook from "@hooks/BaseHooks";
const columns = [
  {
    name: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Vai trò",
    dataIndex: "isAdmin",
    key: "isAdmin",
    render: (text) => <a>{text ? "Admin" : "User"}</a>,
  },
];
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { notify, getData } = useBaseHook();
  useEffect(() => {
    async function fetch() {
      let [error, _users = []] = await to(userService().withAuth().index());
      setLoading(false);
      if (error) {
        notify(error.message, "", "error");
        return;
      }
      console.log("_users ", _users)
      setUsers(_users);
    }
    fetch();
    // code to run on component mount
  }, []);
  return <Table columns={columns} loading = {loading} dataSource={users} />;
};

export default Dashboard;
