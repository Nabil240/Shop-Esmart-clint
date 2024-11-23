import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { confirmAlert, confirmationAlert, failedAlert } from "../SweetAlart/SweelAlart";
import { Rating } from "@smastrom/react-rating";


const AdminPageGridView = ({ collections, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const isAdmin = true;

  const handleDeleteProduct = (_id) => {
    confirmationAlert({ detailsText: "Do you want to delete it ?" }).then(
      async (res) => {
        if (res.isConfirmed) {
          const res = await axiosSecure.delete(`/products/delete/${_id}`);
          // console.log(res.data);
          if (res.data.deletedCount > 0) {
            confirmAlert("Delete Success !");
            refetch();
          }
          else{
            failedAlert('Failed to Delete Product!');
          }
        }
      }
    );
  };
  return (
    <section className="grid  grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
      {collections.map((item) => (
        <div key={item._id}>
          <Link
            to={`/dashboard/admin/products/${item._id}`}
            className="hover:shadow-2xl dark:shadow-gray-600"
          >
            <div className="md:h-80 h-48 overflow-hidden ">
              {item?.images[0].image_url && (
                <div className="h-3/4">
                  <img
                    className="w-full h-full object-cover"
                    src={item?.images[0].image_url}
                    alt=""
                  />
                </div>
              )}
              <div className="px-1 flex flex-col justify-evenly h-1/4">
                <div>
                  <h2 className="md:text-base text-justify text-[10px] font-semibol">
                    {item?.productName?.length > 35
                      ? `${item?.productName.slice(0, 35)}...`
                      : item?.productName}
                  </h2>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs md:text-lg">Tk: {item.finalPrice}</p>{" "}
                  {item?.ratings && (
                    <span className="flex items-center text-xs md:text-lg">
                      <Rating
                        className="md:max-w-20 max-w-10"
                        value={item.ratings}
                        readOnly
                      />
                      <span className="text-[6px] md:text-[9px]">
                        ({item.ratingsCount})
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
          {isAdmin && (
            <div className="grid grid-cols-2 gap-2">
              <div className="w-full">
                <Link to={`/dashboard/update/${item._id}`}>
                  <button className="py-2 w-full bg-green-500 text-white hover:bg-green-800">
                    Update
                  </button>
                </Link>
              </div>
              <div>
                <button onClick={()=>handleDeleteProduct(item._id)} className="py-2 w-full bg-red-500 text-white hover:bg-red-800">
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default AdminPageGridView;
