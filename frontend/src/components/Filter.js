import React from "react";
import { Select, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
const { Title } = Typography;
const Filter = ({ laneFilter, setLaneFilter, rankFilter, setRankFilter }) => {
  const LaneTag = [
    { value: "Top" },
    { value: "Jungle" },
    { value: "Middle" },
    { value: "Button" },
    { value: "Support" },
  ];
  const RankTag = [
    { value: "鐵" },
    { value: "銅" },
    { value: "銀" },
    { value: "金" },
    { value: "白金" },
    { value: "鑽石" },
    { value: "大師" },
    { value: "宗師" },
    { value: "菁英" },
  ];
  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color="#5b8c00"
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <>
      <Title level={3}>Custom conditions</Title>
      <Title level={4}>Lane:</Title>
      <Select
        mode="multiple"
        showArrow
        tagRender={tagRender}
        defaultValue={[]}
        style={{
          width: "100%",
        }}
        options={LaneTag}
        onChange={(e) => {
          setLaneFilter(e);
        }}
      />
      <Title level={4}>Rank:</Title>
      <Select
        mode="multiple"
        showArrow
        tagRender={tagRender}
        defaultValue={[]}
        style={{
          width: "100%",
        }}
        options={RankTag}
        onChange={(e) => {
          setRankFilter(e);
        }}
      />
    </>
  );
};
export default Filter;
