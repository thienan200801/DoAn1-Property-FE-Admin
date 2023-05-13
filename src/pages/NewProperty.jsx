import { Box, Paper } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PropertyForm from "~/components/Properties/PropertyForm";
import * as SagaActionTypes from "~/redux/constants/constantSaga";
import PageHeading from "~/ui-components/PageHeading";

export default function NewProperty() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_PROVINCES_SAGA });
  }, []);

  return (
    <Paper elevation={0}>
      <PageHeading content="Tạo mới tài sản bán" />
      <Box height="24px" />
      <PropertyForm type="new" />
    </Paper>
  );
}
