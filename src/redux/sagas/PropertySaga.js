import { call, put, takeLatest } from "redux-saga/effects";
import PropertyServices from "~/services/PropertyServices";
import {
  STATUS_NO_CONTENT,
  STATUS_SUCCESS,
  STATUS_NOT_FOUND,
} from "~/services/urlAPI";
import showSweetAlert from "~/utils/show-sweet-alert";
import * as ActionTypes from "../constants/constant";
import {
  DELETE_PROPERTY_SAGA,
  GET_PROPERTIES_SAGA,
  GET_PROPERTY_BY_SLUG_SAGA,
  POST_PROPERTY_SAGA,
  UPDATE_PROPERTY_SAGA,
} from "../constants/constantSaga";

function* actGetProperties() {
  yield put({ type: ActionTypes.SHOW_LOADING });

  try {
    let { data, status } = yield call(() => PropertyServices.getProperties());
    if (status === STATUS_SUCCESS) {
      yield put({
        type: ActionTypes.GET_PROPERTIES,
        properties: data,
      });
    } else
      showSweetAlert(
        "Tải danh sách tài sản thất bại! Vui lòng tải lại trang",
        "error"
      );
  } catch (err) {
    showSweetAlert(
      "Tải danh sách tài sản thất bại! Vui lòng tải lại trang",
      "error"
    );
  }
  yield put({ type: ActionTypes.HIDE_LOADING });
}

function* actGetPropertyBySlug(action) {
  const { slug, navigateToNotFound } = action;
  yield put({ type: ActionTypes.SHOW_LOADING });
  try {
    let { data, status } = yield call(() =>
      PropertyServices.getPropertyBySlug(slug)
    );

    if (status === STATUS_SUCCESS) {
      yield put({
        type: ActionTypes.GET_MODIFYING_PROPERTY,
        modifyingProperty: data,
      });
    } else
      showSweetAlert("Tải tài sản thất bại! Vui lòng tải lại trang", "error");
  } catch (err) {
    showSweetAlert("Tải tài sản thất bại! Vui lòng tải lại trang", "error");
    if (err.response.status === STATUS_NOT_FOUND) navigateToNotFound();
  }
  yield put({ type: ActionTypes.HIDE_LOADING });
}

function* actPostProperty(action) {
  const { property, resetForm } = action;

  try {
    let { status } = yield call(() => PropertyServices.postProperty(property));
    if (status === STATUS_SUCCESS) {
      yield put({ type: GET_PROPERTIES_SAGA });
      showSweetAlert("Tạo mới tài sản thành công", "success");
      resetForm();
    } else {
      showSweetAlert("Tạo mới tài sản thất bại", "error");
    }
  } catch (err) {
    showSweetAlert("Tạo mới tài sản thất bại", "error");
  }
}

function* actUpdateProperty(action) {
  const { property } = action;

  try {
    let { data, status } = yield call(() =>
      PropertyServices.updateProperty(property)
    );
    if (status === STATUS_SUCCESS) {
      yield put({ type: GET_PROPERTIES_SAGA });
      yield put({
        type: ActionTypes.GET_MODIFYING_PROPERTY,
        modifyingProperty: data,
      });
      showSweetAlert("Chỉnh sửa thông tin tài sản thành công", "success");
    } else {
      showSweetAlert("Chỉnh sửa thông tin tài sản thất bại", "error");
    }
  } catch (err) {
    showSweetAlert("Chỉnh sửa thông tin tài sản thất bại", "error");
  }
}

function* actDeleteProperty(action) {
  const { propertyId } = action;

  try {
    const { status } = yield call(() =>
      PropertyServices.deleteProperty(propertyId)
    );

    if (status === STATUS_NO_CONTENT) {
      yield put({ type: GET_PROPERTIES_SAGA });
      showSweetAlert("Xóa tài sản thành công", "success");
    } else {
      showSweetAlert("Xóa tài sản thất bại", "error");
    }
  } catch (err) {
    showSweetAlert("Xóa tài sản thất bại", "error");
  }
}

export function* followActGetProperties() {
  yield takeLatest(GET_PROPERTIES_SAGA, actGetProperties);
}

export function* followActGetPropertyBySlug() {
  yield takeLatest(GET_PROPERTY_BY_SLUG_SAGA, actGetPropertyBySlug);
}

export function* followActPostProperty() {
  yield takeLatest(POST_PROPERTY_SAGA, actPostProperty);
}

export function* followActUpdateProperty() {
  yield takeLatest(UPDATE_PROPERTY_SAGA, actUpdateProperty);
}

export function* followActDeleteProperty() {
  yield takeLatest(DELETE_PROPERTY_SAGA, actDeleteProperty);
}
