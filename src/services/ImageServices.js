import Axios from "axios";
import { URL_POST_IMAGE } from "./urlAPI";

const ImageServices = {
  postImage: (image) => {
    return Axios({
      method: "POST",
      url: URL_POST_IMAGE,
      data: image,
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default ImageServices;
