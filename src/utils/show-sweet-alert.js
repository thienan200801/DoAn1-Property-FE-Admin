import Swal from "sweetalert2";

const showSweetAlert = (content, iconType) => {
  Swal.fire({
    text: content,
    icon: iconType,
    confirmButtonText: "OK",
    confirmButtonColor: "#003366",
    timer: 1000,
  });
};

export default showSweetAlert;
