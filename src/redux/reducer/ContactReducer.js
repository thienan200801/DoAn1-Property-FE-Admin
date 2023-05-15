import * as ActionTypes from "../constants/constant";

const initialState = {
  contacts: [],
};

const ContactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_CONTACTS:
      state.contacts = action.contacts.map((contact) => ({
        ...contact,
        demandType:
          contact.demandType === "SELL" ? "Nhu cầu bán" : "Nhu cầu mua",
        processingStatus:
          contact.processingStatus === "WORKING"
            ? "Đang xử lý"
            : contact.processingStatus === "COMPLETE"
            ? "Đã xử lý"
            : "Đang chờ",
      }));
      return { ...state };
    default:
      return state;
  }
};

export default ContactReducer;
