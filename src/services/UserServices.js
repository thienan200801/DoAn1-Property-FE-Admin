import Axios from "axios";
import { URL_POST_LOGIN } from "./urlAPI";

const UserServices = {
  postLogin: (user) => {
    return Axios.post(URL_POST_LOGIN, user);
  },
};

export default UserServices;
