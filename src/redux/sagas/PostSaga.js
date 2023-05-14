import { call, put, takeLatest } from "redux-saga/effects";
import PostServices from "~/services/PostServices";
import {
  STATUS_NO_CONTENT,
  STATUS_SUCCESS,
  STATUS_NOT_FOUND,
} from "~/services/urlAPI";
import showSweetAlert from "~/utils/show-sweet-alert";
import * as ActionTypes from "../constants/constant";
import {
  DELETE_POST_SAGA,
  GET_POSTS_SAGA,
  GET_POST_BY_SLUG_SAGA,
  POST_POST_SAGA,
  UPDATE_POST_SAGA,
} from "../constants/constantSaga";

function* actGetPosts(action) {
  const { postType } = action;
  yield put({ type: ActionTypes.SHOW_LOADING });

  try {
    let { data, status } = yield call(() => PostServices.getPosts(postType));
    if (status === STATUS_SUCCESS) {
      yield put({
        type: ActionTypes.GET_POSTS,
        posts: data,
      });
    } else
      showSweetAlert(
        "Tải danh sách bài viết thất bại! Vui lòng tải lại trang",
        "error"
      );
  } catch (err) {
    showSweetAlert(
      "Tải danh sách bài viết thất bại! Vui lòng tải lại trang",
      "error"
    );
  }
  yield put({ type: ActionTypes.HIDE_LOADING });
}

function* actGetPostBySlug(action) {
  const { slug, navigateToNotFound } = action;
  yield put({ type: ActionTypes.SHOW_LOADING });

  try {
    let { data, status } = yield call(() => PostServices.getPostBySlug(slug));
    if (status === STATUS_SUCCESS && data !== "") {
      yield put({
        type: ActionTypes.GET_MODIFYING_POST,
        modifyingPost: data,
      });
    } else showSweetAlert("Tải bài viết thất bại! Vui lòng thử lại", "error");
  } catch (err) {
    showSweetAlert("Tải bài viết thất bại! Vui lòng thử lại", "error");
    if (err.response.status === STATUS_NOT_FOUND) navigateToNotFound();
  }
  yield put({ type: ActionTypes.HIDE_LOADING });
}

function* actPostPost(action) {
  const { post, postType, resetForm } = action;

  try {
    let { status } = yield call(() => PostServices.postPost(post));
    if (status === STATUS_SUCCESS) {
      yield put({ type: GET_POSTS_SAGA, postType: postType });
      showSweetAlert("Tạo mới bài viết thành công", "success");
      resetForm();
    } else {
      showSweetAlert("Tạo mới bài viết thất bại", "error");
    }
  } catch (err) {
    showSweetAlert("Tạo mới bài viết thất bại", "error");
  }
}

function* actUpdatePost(action) {
  const { post, postType } = action;
  try {
    let { data, status } = yield call(() => PostServices.updatePost(post));
    if (status === STATUS_SUCCESS) {
      yield put({ type: GET_POSTS_SAGA, postType: postType });
      yield put({
        type: ActionTypes.GET_MODIFYING_POST,
        modifyingPost: data,
      });
      showSweetAlert("Chỉnh sửa bài viết thành công", "success");
    } else {
      showSweetAlert("Chỉnh sửa bài viết thất bại", "error");
    }
  } catch (err) {
    showSweetAlert("Chỉnh sửa bài viết thất bại", "error");
  }
}

function* actDeletePost(action) {
  const { postId, postType } = action;

  try {
    const { status } = yield call(() => PostServices.deletePost(postId));

    if (status === STATUS_NO_CONTENT) {
      yield put({ type: GET_POSTS_SAGA, postType: postType });
      showSweetAlert("Xóa bài viết thành công", "success");
    } else {
      showSweetAlert("Xóa bài viết thất bại", "error");
    }
  } catch (err) {
    showSweetAlert("Xóa bài viết thất bại", "error");
  }
}

export function* followActGetPosts() {
  yield takeLatest(GET_POSTS_SAGA, actGetPosts);
}

export function* followActGetPostBySlug() {
  yield takeLatest(GET_POST_BY_SLUG_SAGA, actGetPostBySlug);
}

export function* followActPostPost() {
  yield takeLatest(POST_POST_SAGA, actPostPost);
}

export function* followActUpdatePost() {
  yield takeLatest(UPDATE_POST_SAGA, actUpdatePost);
}

export function* followActDeletePost() {
  yield takeLatest(DELETE_POST_SAGA, actDeletePost);
}
