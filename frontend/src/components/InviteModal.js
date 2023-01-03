import { useState, useEffect, useRef } from "react";
import {
  Button,
  Input,
  message,
  Tag,
  Form,
  Modal,
  DatePicker,
  Space,
  TimePicker,
} from "antd";
import dayjs from "dayjs";

const { TextArea } = Input;

const InviteModal = ({ open, onCancel, player }) => {
  const [form] = Form.useForm();
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const onReset = () => {
    form.resetFields();
  };
  const getItem = () => form.getFieldsValue(["date", "time", "message"]);
  const format = "HH:mm";
  return (
    <Modal
      open={open}
      title={`Invite ${player} for a game`}
      okText="Invite"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        console.log(
          getItem().date.$M + 1,
          getItem().date.$D,
          //   getItem().time.$d.getDate(),
          //   getItem().time.$d.getDate(),
          getItem().time.$H,
          getItem().time.$m,
          getItem().message
        );
      }}
    >
      <div
        style={{
          margin: "24px 0",
        }}
      />
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        form={form}
      >
        <Form.Item label="Date" name="date">
          <DatePicker onChange={onChange} />
        </Form.Item>
        <Form.Item label="Time" name="time">
          <TimePicker format={format} />
        </Form.Item>
        <Form.Item label="Message" name="message">
          <TextArea
            placeholder="Leave a message here..."
            autoSize={{
              minRows: 2,
              maxRows: 6,
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InviteModal;
