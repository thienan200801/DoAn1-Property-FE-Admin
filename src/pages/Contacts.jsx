import { Box, CircularProgress, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactDetailModal from "~/components/Contacts/ContactDetailModal";
import EditContactModal from "~/components/Contacts/EditContactModal";
import TableContacts from "~/components/Table/TableContacts";
import * as SagaActionTypes from "~/redux/constants/constantSaga";
import PageHeading from "~/ui-components/PageHeading";
import ReactCSV from "./ReactCSV";

export default function Contacts() {
  const { loading } = useSelector((state) => state.LoadingReducer);
  const { contacts } = useSelector((state) => state.ContactReducer);

  const [openDetail, setOpenDetail] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const dispatch = useDispatch();

  const handleClose = () => {
    setSelectedContact(null);
    setOpenModify(false);
    setOpenDetail(false);
  };

  const handleDetail = (contact) => {
    setSelectedContact(contact);
    setOpenDetail(true);
  };

  const handleModify = (contact) => {
    setSelectedContact(contact);
    setOpenModify(true);
  };

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_CONTACTS_SAGA });
  }, []);

  return (
    <Paper elevation={0}>
      <PageHeading content="Danh sách thông tin liên hệ" />
      <ReactCSV />
      <Box sx={{ height: "16px" }} />
      {loading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "4rem",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <TableContacts
          data={contacts}
          handleDetail={handleDetail}
          handleModify={handleModify}
        />
      )}

      {openDetail && (
        <ContactDetailModal
          handleClose={handleClose}
          contact={selectedContact}
        />
      )}

      {openModify && (
        <EditContactModal handleClose={handleClose} contact={selectedContact} />
      )}
    </Paper>
  );
}
