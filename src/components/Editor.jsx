import ImageUploader from "quill-image-uploader";
import ReactQuill, { Quill } from "react-quill";
import ImageServices from "~/services/ImageServices";
import showSweetAlert from "~/utils/show-sweet-alert";

Quill.register("modules/imageUploader", ImageUploader);

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["image", "link"],
      ["clean"],
    ],
  },
  imageUploader: {
    upload: (file) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", file);
        ImageServices.postImage(formData)
          .then((response) => {
            resolve(response.data.link);
          })
          .catch((error) => {
            showSweetAlert("Tải ảnh thất bại", "error");
          });
      });
    },
  },
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "indent",
  "link",
  "script",
  "image",
  "align",
  "color",
  "background",
  "direction",
];

export default function Editor({ content, handleChange }) {
  return (
    <ReactQuill
      modules={modules}
      placeholder="Nhập nội dung bài viết tại đây ..."
      value={content}
      onChange={(value) => handleChange(value)}
      formats={formats}
      theme="snow"
    />
  );
}
