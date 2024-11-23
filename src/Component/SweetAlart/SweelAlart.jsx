import Swal from "sweetalert2";

export const confirmAlert = (message) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: `${message}`,
    iconColor: "green",
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      title: "text-lg md:text-2xl",
      icon: "text-xs md:text-xs",
    },
  });
};

export const failedAlert = (message) => {
  Swal.fire({
    position: "center",
    icon: "error",
    iconColor: "red",
    title: `${message}`,
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      title: "text-lg md:text-2xl",
      icon: "text-xs md:text-xs",
    },
  });
};

export const confirmationAlert = (
 { titleText = "Are you sure?",
  detailsText = "You won't be able to revert this!",
  confirmButtonText = "Yes, delete it!"}
) => {
  return Swal.fire({
    title: `${titleText}`,
    text: `${detailsText}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ff3811",
    cancelButtonColor: "green",
    confirmButtonText: `${confirmButtonText}`,
    customClass: {
      title: "text-lg md:text-2xl",
      icon: "text-xs md:text-xs",
      text: "text-sm md:text-xl",
    },
  })
};


