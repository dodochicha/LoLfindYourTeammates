import { useQuery } from "@apollo/client";
import { GET_INVITATIONS_QUERY } from "../graphql/queries";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import { Table, Layout, Button, Typography, Input, Avatar, Badge } from "antd";
import { NotificationOutlined } from "@ant-design/icons";
import { RedoOutlined } from "@ant-design/icons";
import { columns } from "../utils/columns";
import Filter from "./Filter";
import InviteModal from "./InviteModal";

const { Title } = Typography;
const { Header, Content, Sider, Footer } = Layout;

function InvitationList() {
  const {
    loading,
    error,
    data: invitationsData,
    subscribeToMore,
  } = useQuery(GET_INVITATIONS_QUERY);
  console.log(invitationsData);
  const columns = [
    {
      title: "Sender",
      dataIndex: "sender",
      // filters: [
      //   {
      //     text: "Joe",
      //     value: "Joe",
      //   },
      //   {
      //     text: "Category 1",
      //     value: "Category 1",
      //   },
      //   {
      //     text: "Category 2",
      //     value: "Category 2",
      //   },
      // ],
      // filterMode: "tree",
      // filterSearch: true,
      // onFilter: (value, record) => record.name.startsWith(value),
      // width: "30%",
    },
    {
      title: "Time",
      dataIndex: "time",
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
      // filters: [
      //   {
      //     text: "London",
      //     value: "London",
      //   },
      //   {
      //     text: "New York",
      //     value: "New York",
      //   },
      // ],
      // onFilter: (value, record) => record.address.startsWith(value),
      // filterSearch: true,
      // width: "40%",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];
  return <div></div>;
}

export default InvitationList;
