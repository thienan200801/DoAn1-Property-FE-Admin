import Axios from "axios";
import {
  URL_DELETE_CONTACT,
  URL_GET_CONTACTS,
  URL_GET_ALL_CONTACTS,
  URL_UPDATE_CONTACT,
} from "./urlAPI";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const ContactServices = {
  getContacts: () => {
    return Axios({
      url: URL_GET_CONTACTS,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getAllContacts: () => {
    return Axios({
      url: URL_GET_ALL_CONTACTS,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  updateContact: (contact) => {
    return Axios({
      url: URL_UPDATE_CONTACT(contact.id),
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        processingStatus: contact.processingStatus,
        noteByAdmin: contact.noteByAdmin,
      },
    });
  },

  deleteContact: (contactId) => {
    return Axios({
      url: URL_DELETE_CONTACT(contactId),
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default ContactServices;
