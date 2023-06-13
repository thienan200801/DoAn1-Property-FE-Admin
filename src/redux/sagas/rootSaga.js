import { all } from "redux-saga/effects";
import * as AdministrativeSaga from "./AdministrativeSaga";
import * as ContactSaga from "./ContactSaga";
import * as PostSaga from "./PostSaga";
import * as PropertySaga from "./PropertySaga";
import * as UserSaga from "./UserSaga";

export default function* rootSaga() {
  yield all([
    // UserSaga
    UserSaga.followActLogin(),
    // AdministrativeSaga
    AdministrativeSaga.followActGetProvinces(),
    AdministrativeSaga.followActGetDistricts(),
    AdministrativeSaga.followActGetWards(),
    // PropertySaga
    PropertySaga.followActGetProperties(),
    PropertySaga.followActGetPropertyBySlug(),
    PropertySaga.followActPostProperty(),
    PropertySaga.followActUpdateProperty(),
    PropertySaga.followActDeleteProperty(),
    // ContactSaga
    ContactSaga.followActGetContacts(),
    ContactSaga.followActGetAllContacts(),
    ContactSaga.followActUpdateContact(),
    ContactSaga.followActDeleteContact(),
    // PostSaga
    PostSaga.followActGetPosts(),
    PostSaga.followActGetPostBySlug(),
    PostSaga.followActPostPost(),
    PostSaga.followActUpdatePost(),
    PostSaga.followActDeletePost(),
  ]);
}
