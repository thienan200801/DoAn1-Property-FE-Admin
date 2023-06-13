import {
  convertImageNameToImageUrl,
  replaceImageNameByImageUrl,
} from "~/utils/image-processing";
import * as ActionTypes from "../constants/constant";

const initialState = {
  posts: [],
  modifyingPost: null,
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_POSTS:
      state.posts = action.posts;
      return { ...state };
    case ActionTypes.GET_MODIFYING_POST:
      if (action.modifyingPost !== null)
        state.modifyingPost = {
          ...action.modifyingPost,
          content: replaceImageNameByImageUrl(action.modifyingPost.content),
          thumbnail: convertImageNameToImageUrl(action.modifyingPost.thumbnail),
        };
      else state.modifyingPost = action.modifyingPost;
      return { ...state };
    default:
      return state;
  }
};

export default PostReducer;
