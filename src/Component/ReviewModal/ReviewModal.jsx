import ReviewTake from "../ReviewTake/ReviewTake";
import { ImCross } from "react-icons/im";

const ReviewModal = ({ onClose, product, refetch }) => {
  return (
    <div className="modal  overflow-y-hidden modal-open modal-middle">
      <div className="modal-box">
        <img
          className="w-24 h-24 object-cover mx-auto"
          src={product.productIamge}
          alt=""
        />
        <ReviewTake refetch={refetch} onClose={onClose} _id={product.product_id}></ReviewTake>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={onClose}
              className="text-2xl absolute right-4 top-4"
            >
              <ImCross />{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
