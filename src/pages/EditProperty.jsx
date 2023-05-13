import { Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PropertyForm from "~/components/Properties/PropertyForm";
import * as SagaActionTypes from "~/redux/constants/constantSaga";
import * as ActionTypes from "~/redux/constants/constant";
import Loading from "~/ui-components/Loading";
import PageHeading from "~/ui-components/PageHeading";

export default function EditProperty() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { slug } = params;

  const { loading } = useSelector((state) => state.LoadingReducer);
  const { provinces, districts } = useSelector(
    (state) => state.AdministrativeReducer
  );

  const { modifyingProperty } = useSelector((state) => state.PropertyReducer);
  const [modifyingProvince, setModifyingProvince] = useState(null);
  const [modifyingDistrict, setModifyingDistrict] = useState(null);
  const [isInit, setIsInit] = useState(false);

  const navigateToNotFound = () => {
    navigate("/404");
  };

  useEffect(() => {
    dispatch({
      type: SagaActionTypes.GET_PROPERTY_BY_SLUG_SAGA,
      slug: slug,
      navigateToNotFound: navigateToNotFound,
    });
    dispatch({ type: SagaActionTypes.GET_PROVINCES_SAGA });

    return () => {
      dispatch({
        type: ActionTypes.GET_MODIFYING_PROPERTY,
        modifyingProperty: null,
      });
      dispatch({ type: ActionTypes.GET_DISTRICTS, districts: [] });
    };
  }, []);

  useEffect(() => {
    if (provinces.length > 0 && modifyingProperty) {
      const province = provinces.find(
        (province) => province.name === modifyingProperty.province
      );

      if (province) {
        setModifyingProvince(province);
        dispatch({
          type: SagaActionTypes.GET_DISTRICTS_SAGA,
          pCode: province.code,
        });
      }
    }
  }, [provinces, modifyingProperty, dispatch]);

  useEffect(() => {
    if (districts.length > 0 && modifyingProperty) {
      setModifyingDistrict(
        districts.find(
          (district) => district.name === modifyingProperty.district
        )
      );
      setIsInit(true);
    }
  }, [districts, modifyingProperty]);

  return (
    <Paper elevation={0}>
      <PageHeading content="Chỉnh sửa tài sản bán" />
      <Box height="24px" />
      {loading || (!isInit && (!modifyingProvince || !modifyingDistrict)) ? (
        <Loading />
      ) : (
        <PropertyForm
          type="modify"
          property={modifyingProperty}
          province={modifyingProvince}
          district={modifyingDistrict}
        />
      )}
    </Paper>
  );
}
