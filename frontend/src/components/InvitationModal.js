import { Form, Modal, List, Typography } from "antd";
import InvitationList from "./InvitationList";
import ReplyList from "./ReplyList";

function InvitationModal({
  open,
  setOpen,
  myPlayerName,
  setInvitationReadNum,
}) {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title={`Your notification`}
      okText="Close"
      cancelText="Cancel"
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
    >
      <InvitationList
        myPlayerName={myPlayerName}
        setInvitationReadNum={setInvitationReadNum}
      />
      <ReplyList myPlayerName={myPlayerName} />
    </Modal>
  );
}

export default InvitationModal;
