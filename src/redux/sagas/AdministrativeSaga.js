import { call, put, takeLatest } from "redux-saga/effects";
import AdministrativeServices from "~/services/AdministrativeServices";
import { STATUS_SUCCESS } from "~/services/urlAPI";
import showSweetAlert from "~/utils/show-sweet-alert";
import * as ActionTypes from "../constants/constant";
import {
  GET_DISTRICTS_SAGA,
  GET_PROVINCES_SAGA,
  GET_WARDS_SAGA,
} from "../constants/constantSaga";

function* actGetProvinces() {
  try {
    let { data, status } = yield call(() =>
      AdministrativeServices.getProvinces()
    );

    if (status === STATUS_SUCCESS) {
      yield put({
        type: ActionTypes.GET_PROVINCES,
        provinces: data,
      });
    }
  } catch (err) {
    showSweetAlert(
      "Tải danh sách tỉnh / thành phố thất bại! Vui lòng tải lại trang",
      "error"
    );
  }
}

function* actGetDistricts(action) {
  const { pCode } = action;
  try {
    let { data, status } = yield call(() =>
      AdministrativeServices.getDistricts(pCode)
    );
    if (status === STATUS_SUCCESS) {
      yield put({
        type: ActionTypes.GET_DISTRICTS,
        districts: data.districts,
      });
    }
  } catch (err) {
    showSweetAlert(
      "Tải danh sách quận / huyện thất bại! Vui lòng tải lại trang",
      "error"
    );
  }
}

function* actGetWards(action) {
  const { dCode } = action;
  try {
    let { data, status } = yield call(() =>
      AdministrativeServices.getWards(dCode)
    );

    if (status === STATUS_SUCCESS) {
      yield put({
        type: ActionTypes.GET_WARDS,
        wards: data,
      });
    }
  } catch (err) {
    showSweetAlert(
      "Tải danh sách phường / xã thất bại! Vui lòng tải lại trang",
      "error"
    );
  }
}

export function* followActGetProvinces() {
  yield takeLatest(GET_PROVINCES_SAGA, actGetProvinces);
}

export function* followActGetDistricts() {
  yield takeLatest(GET_DISTRICTS_SAGA, actGetDistricts);
}

export function* followActGetWards() {
  yield takeLatest(GET_WARDS_SAGA, actGetWards);
}
