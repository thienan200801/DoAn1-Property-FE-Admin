import Axios from "axios";
import Cookies from "js-cookie";
import {
  URL_DELETE_PROPERTY,
  URL_GET_PROPERTIES,
  URL_GET_PROPERTY_BY_SLUG,
  URL_POST_PROPERTY,
  URL_UPDATE_PROPERTY,
} from "./urlAPI";

const token = Cookies.get("token");

const PropertyServices = {
  getProperties: () => {
    return Axios({
      url: URL_GET_PROPERTIES,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getPropertyBySlug: (slug) => {
    return Axios({
      url: URL_GET_PROPERTY_BY_SLUG(slug),
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  postProperty: (property) => {
    return Axios({
      url: URL_POST_PROPERTY,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: property,
    });
  },

  updateProperty: (property) => {
    return Axios({
      url: URL_UPDATE_PROPERTY(property.id),
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: property,
    });
  },

  deleteProperty: (propertyId) => {
    return Axios({
      url: URL_DELETE_PROPERTY(propertyId),
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default PropertyServices;
