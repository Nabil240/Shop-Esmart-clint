import { confirmAlert, failedAlert } from "../../../Component/SweetAlart/SweelAlart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CategoryAddNew = () => {
  const axiosSecure = useAxiosSecure();

  const handleCategoryAdd = async (e) => {
    e.preventDefault();
    const categoryName = e.target.categoryName.value.toLowerCase();
    const hashNumber = /\d/; 
    if(hashNumber.test(categoryName)){
      return failedAlert("Category name shouldn't contain numbers")
    }
    const res = await axiosSecure.post("/categories/addnew", {
      categoryName: categoryName,
    });
    if(res.data.insertedId){
       return confirmAlert('Add New Category Success!')
    }
    if(!res.data.success){
        failedAlert('Faled! Already This Category Added')
    }
  };
  return (
    <form onSubmit={handleCategoryAdd}>
      <div className="space-y-2">
        <label htmlFor="category" className="text-xl">
          Add New Category
        </label>
        <input
          required
          type="text"
          name="categoryName"
          placeholder="Category Name"
          className="px-2 py-1 rounded-sm outline-none border w-full me-2"
        />
        <input
          type="submit"
          value="Add New"
          className="w-1/4 text-center text-white bg-[#ff3811] hover:bg-red-700 rounded-sm py-1"
        />
      </div>
    </form>
  );
};

export default CategoryAddNew;
