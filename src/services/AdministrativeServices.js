import Axios from "axios";
import { URL_GET_DISTRICTS, URL_GET_PROVINCES, URL_GET_WARDS } from "./urlAPI";

const AdministrativeServices = {
  getProvinces: () => {
    return Axios({
      url: URL_GET_PROVINCES,
      method: "GET",
    });
  },

  getDistricts: (pId) => {
    return Axios({
      url: URL_GET_DISTRICTS(pId),
      method: "GET",
    });
  },

  getWards: (dId) => {
    return Axios({
      url: URL_GET_WARDS(dId),
      method: "GET",
    });
  },
};

export default AdministrativeServices;
