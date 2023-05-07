import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as SagaActionTypes from "~/redux/constants/constantSaga";

const processingStatusOptions = [
  {
    value: "PENDING",
    label: "Đang chờ",
  },
  {
    value: "WORKING",
    label: "Đang xử lý",
  },
  {
    value: "COMPLETE",
    label: "Đã xử lý",
  },
];

export default function EditContactModal({ handleClose, contact }) {
  const dispatch = useDispatch();
  const [editingProcessingStatus, setEditingProcessingStatus] = useState();

  const handleModifyContact = (values) => {
    dispatch({
      type: SagaActionTypes.UPDATE_CONTACT_SAGA,
      contact: {
        ...contact,
        noteByAdmin: values.noteByAdmin,
        processingStatus: values.processingStatus.value,
      },
    });
    handleClose();
  };

  useLayoutEffect(() => {
    setEditingProcessingStatus(
      processingStatusOptions.find(
        (opt) => opt.label === contact.processingStatus
      )
    );
  }, [contact]);

  return (
    <Dialog open={true} sx={{ p: 4 }}>
      <DialogTitle sx={{ fontSize: 20 }}>Chỉnh sửa trạng thái</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            noteByAdmin: contact.noteByAdmin ? contact.noteByAdmin : "",
            processingStatus: editingProcessingStatus
              ? editingProcessingStatus
              : processingStatusOptions[0],
          }}
          onSubmit={(values) => {
            handleModifyContact(values);
          }}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mt: 1, mb: 2 }}>
                <Autocomplete
                  name="processingStatus"
                  options={processingStatusOptions}
                  disableClearable
                  defaultValue={
                    editingProcessingStatus
                      ? editingProcessingStatus
                      : processingStatusOptions[0]
                  }
                  value={values.processingStatus}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  onChange={(e, option) => {
                    setFieldValue("processingStatus", option);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tình trạng xử lý"
                      value={values.processingStatus.label}
                    />
                  )}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mt: 1, mb: 2 }}>
                <TextField
                  label="Ghi chú"
                  multiline
                  value={values.noteByAdmin}
                  name="noteByAdmin"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </FormControl>

              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button onClick={handleClose} color="error" sx={{ mr: 1 }}>
                  Huỷ
                </Button>
                <Button type="submit" variant="outlined">
                  Xác nhận
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
