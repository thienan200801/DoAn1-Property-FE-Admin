import * as ActionTypes from "../constants/constant";

const initialState = {
  userLogin: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_USER:
      state.userLogin = action.userLogin;
      return { ...state };

    default:
      return { ...state };
  }
};

export default UserReducer;
