import { useQuery, useMutation } from "@apollo/client";
import { GET_INVITATIONS_QUERY } from "../graphql/queries";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import { Table, Layout, Button, Typography, Input, Avatar, Badge } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { RedoOutlined } from "@ant-design/icons";
import { columns } from "../utils/columns";
import Filter from "./Filter";
import InviteModal from "./InviteModal";
import { UPDATE_INVITATION_MUTATION } from "../graphql/mutations";

const { Title } = Typography;
const { Header, Content, Sider, Footer } = Layout;

function InvitationList({ myPlayerName, setInvitationReadNum }) {
  const {
    loading,
    error,
    data: invitationsData,
    subscribeToMore,
  } = useQuery(GET_INVITATIONS_QUERY);
  const [updateInvitation] = useMutation(UPDATE_INVITATION_MUTATION);
  if (invitationsData !== undefined) {
    var invitations = invitationsData.invitations.map((invitation) => ({
      ...invitation,
      key: invitation._id,
    }));
  } else {
    var invitations = [];
  }
  console.log(invitations);
  const checkedReadNum = (invitations) => {
    const read = invitations.filter((invitation) => !invitation.read);
    console.log(read);
    console.log(invitations);
    return read.length;
  };
  const acceptInvitation = (e) => {
    if (e.target.getAttribute("d") !== null) {
      var id = e.target.parentNode.parentNode.parentNode.className;
    } else {
      var id = e.target.parentNode.parentNode.className;
    }
    updateInvitation({
      variables: {
        input: {
          _id: id,
          ok: true,
        },
      },
    });
  };
  const rejectInvitation = (e) => {
    if (e.target.getAttribute("d") !== null) {
      var id = e.target.parentNode.parentNode.parentNode.className;
    } else {
      var id = e.target.parentNode.parentNode.className;
    }
    updateInvitation({
      variables: {
        input: {
          _id: id,
          ok: false,
        },
      },
    });
  };
  const fontColor = (invitation) => {
    if (invitation.read == false) return null;
    else {
      if (invitation.ok === true) return "green";
      else return "gray";
    }
  };
  const checkedRead = (invitation) => (invitation.read ? true : false);
  const columns = [
    {
      title: "Sender",
      dataIndex: "sender",
      render: (text, record) => (
        <a style={{ color: fontColor(record) }}>{text}</a>
      ),
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
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <a style={{ color: fontColor(record) }}>{text}</a>
      ),
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (text, record) => (
        <a style={{ color: fontColor(record) }}>{text}</a>
      ),
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Message",
      dataIndex: "message",
      render: (text, record) => (
        <a style={{ color: fontColor(record) }}>{text}</a>
      ),
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
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      render: (_id, record) =>
        checkedRead(record) ? null : (
          <div className={_id}>
            <CheckOutlined onClick={acceptInvitation} />
            <CloseOutlined onClick={rejectInvitation} />
          </div>
        ),
    },
  ];
  const result = invitations.filter(
    (invitation) => invitation.to === myPlayerName
  );
  console.log(result, myPlayerName);
  const data = result.map((invitation) => {
    return {
      sender: invitation.sender,
      date: invitation.date,
      time: invitation.time,
      message: invitation.message,
      _id: invitation._id,
      ok: invitation.ok,
      read: invitation.read,
    };
  });
  setInvitationReadNum(checkedReadNum(result));
  return (
    <Table columns={columns} dataSource={data} className="invitation_table" />
  );
}

export default InvitationList;
