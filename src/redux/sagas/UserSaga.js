import Cookies from "js-cookie";
import { call, put, takeLatest } from "redux-saga/effects";
import { STATUS_SUCCESS } from "~/services/urlAPI";
import UserServices from "~/services/UserServices";
import showSweetAlert from "~/utils/show-sweet-alert";
import * as ActionTypes from "../constants/constant";
import { POST_USER_LOGIN_SAGA } from "../constants/constantSaga";

function* actLogin(action) {
  let { userLogin } = action;
  try {
    let { data, status } = yield call(() => UserServices.postLogin(userLogin));
    if (status === STATUS_SUCCESS) {
      showSweetAlert("Đăng nhập thành công", "success");
      Cookies.set("token", data.access_token);
      yield put({
        type: ActionTypes.GET_USER,
        userLogin: data,
      });
    }
  } catch (err) {
    showSweetAlert(
      "Đăng nhập thất bại! Vui lòng kiểm tra lại email và mật khẩu",
      "error"
    );
  }
}

export function* followActLogin() {
  yield takeLatest(POST_USER_LOGIN_SAGA, actLogin);
}
