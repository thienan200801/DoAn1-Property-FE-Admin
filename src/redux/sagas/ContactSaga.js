import { call, put, takeLatest } from "redux-saga/effects";
import ContactServices from "~/services/ContactServices";
import { STATUS_NO_CONTENT, STATUS_SUCCESS } from "~/services/urlAPI";
import showSweetAlert from "~/utils/show-sweet-alert";
import * as ActionTypes from "../constants/constant";
import {
  DELETE_CONTACT_SAGA,
  GET_CONTACTS_SAGA,
  UPDATE_CONTACT_SAGA,
} from "../constants/constantSaga";

function* actGetContacts() {
  yield put({ type: ActionTypes.SHOW_LOADING });
  try {
    let { data, status } = yield call(() => ContactServices.getContacts());
    if (status === STATUS_SUCCESS) {
      yield put({
        type: ActionTypes.GET_CONTACTS,
        contacts: data,
      });
    } else
      showSweetAlert(
        "Tải danh sách liên hệ thất bại! Vui lòng tải lại trang",
        "error"
      );
  } catch (err) {
    showSweetAlert(
      "Tải danh sách liên hệ thất bại! Vui lòng tải lại trang",
      "error"
    );
  }
  yield put({ type: ActionTypes.HIDE_LOADING });
}

function* actUpdateContact(action) {
  const { contact } = action;

  try {
    let { status } = yield call(() => ContactServices.updateContact(contact));
    if (status === STATUS_SUCCESS) {
      yield put({ type: GET_CONTACTS_SAGA });
      showSweetAlert("Chỉnh sửa thông tin liên hệ thành công", "success");
    } else {
      showSweetAlert("Chỉnh sửa thông tin liên hệ thất bại", "error");
    }
  } catch (err) {
    showSweetAlert("Chỉnh sửa thông tin liên hệ thất bại", "error");
  }
}

function* actDeleteContact(action) {
  const { contactId } = action;

  try {
    const { status } = yield call(() =>
      ContactServices.deleteContact(contactId)
    );

    if (status === STATUS_NO_CONTENT) {
      yield put({ type: GET_CONTACTS_SAGA });
      showSweetAlert("Xóa thông tin liên hệ thành công", "success");
    } else {
      showSweetAlert("Xóa thông tin liên hệ thất bại", "error");
    }
  } catch (err) {
    showSweetAlert("Xóa thông tin liên hệ thất bại", "error");
  }
}

export function* followActGetContacts() {
  yield takeLatest(GET_CONTACTS_SAGA, actGetContacts);
}

export function* followActUpdateContact() {
  yield takeLatest(UPDATE_CONTACT_SAGA, actUpdateContact);
}

export function* followActDeleteContact() {
  yield takeLatest(DELETE_CONTACT_SAGA, actDeleteContact);
}
