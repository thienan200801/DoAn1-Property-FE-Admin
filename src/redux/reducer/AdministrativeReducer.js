import * as ActionTypes from "../constants/constant";

const initialState = {
  provinces: [],
  districts: [],
  wards: [],
};

const AdministrativeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PROVINCES:
      state.provinces = action.provinces;
      return { ...state };
    case ActionTypes.GET_DISTRICTS:
      state.districts = action.districts;
      return { ...state };
    case ActionTypes.GET_WARDS:
      state.wards = action.wards;
      return { ...state };
    default:
      return state;
  }
};

export default AdministrativeReducer;
