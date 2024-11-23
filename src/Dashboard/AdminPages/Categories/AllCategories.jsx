import {
  confirmAlert,
  confirmationAlert,
  failedAlert,
} from "../../../Component/SweetAlart/SweelAlart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCategories from "../../../hooks/useCategories";

const AllCategories = () => {
  const [categories, isLoading, refetch] = useCategories();
  const axiosSecure = useAxiosSecure();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Please Wait...
      </div>
    );
  }

  const handleCategoryNameUpdate = (e, _id, oldCategoryName) => {
    e.preventDefault();

    const updateCategoryName = e.target.categoryName.value.toLowerCase();
    // console.log(oldCategoryName, updateCategoryName);

    // console.log("update request",updateCategoryName, _id, oldCategoryName);
    const hashNumber = /\d/;
    if (hashNumber.test(updateCategoryName)) {
      return failedAlert("Category name shouldn't contain numbers");
    }

    confirmationAlert({
      detailsText: "Do you want to update this category?",
      confirmButtonText: "Yes! Update it",
    }).then(async (res) => {
      if (res.isConfirmed) {
        const res = await axiosSecure.put(`/categories/update/${_id}`, {
          updateCategoryName: updateCategoryName,
          oldCategoryName: oldCategoryName,
        });

        if (res.data.matchedCount > 0) {
          await refetch();
          confirmAlert("Update Success!");
        } else {
          failedAlert("Update Failed!");
        }
      }
    });
  };

  const handleCategoryNameDelete = (_id) => {
    confirmationAlert({
      detailsText: "Do you want to delete this category?",
      confirmButtonText: "Yes! Delete it",
    }).then(async (res) => {
      if (res.isConfirmed) {
        const res = await axiosSecure.delete(`/categories/delete/${_id}`);

        if (res.data.deletedCount > 0) {
          await refetch();
          confirmAlert("Delete Success!");
        } else {
          failedAlert("Delete Failed!");
        }
      }
    });
  };
  return (
    <div>
      {categories.map((category, index) => (
        <div className="" key={category._id}>
          <label htmlFor="categoryName" className="">
            Category {index + 1}
          </label>
          <div className="relative">
            <form
              onSubmit={(e) =>
                handleCategoryNameUpdate(
                  e,
                  category._id,
                  category.categoryName[1]
                )
              }
              className="md:w-[85%] w-full grid grid-cols-5 gap-3 my-2"
            >
              <input
                defaultValue={category.categoryName[1]}
                placeholder="Enter Category Name"
                name="categoryName"
                required
                className="px-2 py-1 md:col-span-4 col-span-5  capitalize border text-lg rounded-sm"
                type="text"
              />
              {category.categoryName[1] === "all" || (
                <button className="py-1 w-28 text-lg outline-none bg-green-500 hover:bg-green-800 text-white">
                  Update
                </button>
              )}
            </form>
            {category.categoryName[1] === "all" || (
              <button
                onClick={() => handleCategoryNameDelete(category._id)}
                className="absolute md:right-3 right-[25%] top-[58%] md:top-0 py-1 w-28 text-lg outline-none bg-red-500 hover:bg-red-800 text-white"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllCategories;
