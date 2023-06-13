import { convertImageNameToImageUrl } from "~/utils/image-processing";
import * as ActionTypes from "../constants/constant";

const initialState = {
  properties: [],
  modifyingProperty: null,
};

const PropertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PROPERTIES:
      state.properties = action.properties.map((property) => ({
        ...property,
        postStatus: property.postStatus === "HIDDEN" ? "Đã ẩn" : "Đã xuất bản",
      }));
      return { ...state };
    case ActionTypes.GET_MODIFYING_PROPERTY:
      if (action.modifyingProperty !== null)
        state.modifyingProperty = {
          ...action.modifyingProperty,
          thumbnail: convertImageNameToImageUrl(
            action.modifyingProperty.thumbnail
          ),
          gallery: action.modifyingProperty.gallery.map((imageName) =>
            convertImageNameToImageUrl(imageName)
          ),
        };
      else state.modifyingProperty = action.modifyingProperty;
      return { ...state };
    default:
      return state;
  }
};

export default PropertyReducer;
