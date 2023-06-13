import { Box, Button, CircularProgress, Paper } from "@mui/material";
import { IconPlus } from "@tabler/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TableProperties from "~/components/Table/TableProperties";
import * as SagaActionTypes from "~/redux/constants/constantSaga";
import PageHeading from "~/ui-components/PageHeading";

export default function Properties() {
  const { loading } = useSelector((state) => state.LoadingReducer);
  const { properties } = useSelector((state) => state.PropertyReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_PROPERTIES_SAGA });
  }, []);

  const navigateToNewProperty = () => {
    navigate("/danh-sach-tai-san-ban/tao-moi");
  };

  return (
    <Paper elevation={0}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          rowGap: "16px",
        }}
      >
        <PageHeading content="Danh sách tài sản" />

        <Button
          onClick={navigateToNewProperty}
          variant="outlined"
          sx={{ ml: 2, py: "12px", borderRadius: 1 }}
        >
          <IconPlus />
        </Button>
      </Box>

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
        <TableProperties data={properties} />
      )}
    </Paper>
  );
}
