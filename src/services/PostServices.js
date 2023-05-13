import Axios from "axios";
import Cookies from "js-cookie";
import {
  URL_DELETE_POST,
  URL_GET_POSTS,
  URL_GET_POSTS_WITH_POST_TYPE,
  URL_GET_POST_BY_SLUG,
  URL_POST_POST,
  URL_UPDATE_POST,
} from "./urlAPI";

const token = Cookies.get("token");

const PostServices = {
  getPosts: (postType) => {
    return Axios({
      url: postType ? URL_GET_POSTS_WITH_POST_TYPE(postType) : URL_GET_POSTS,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getPostBySlug: (slug) => {
    return Axios({
      url: URL_GET_POST_BY_SLUG(slug),
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  postPost: (post) => {
    return Axios({
      url: URL_POST_POST,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: post,
    });
  },

  updatePost: (post) => {
    return Axios({
      url: URL_UPDATE_POST(post.id),
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: post,
    });
  },

  deletePost: (postId) => {
    return Axios({
      url: URL_DELETE_POST(postId),
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default PostServices;
