import AllCategories from "./AllCategories";
import CategoryAddNew from "./CategoryAddNew";

const Categories = () => {
     
    
    return (
        <div>
            <h2 className="text-2xl md:text-4xl text-center py-4">Categories</h2>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                <div className="md:col-span-2 md:p-5 p-3 bg-gray-100 dark:bg-gray-800">
                    <h2 className="mb-4 text-center text-xl md:text-3xl">Current All Categories</h2>
                    <AllCategories></AllCategories>
                </div>
                <div className="p-4">
                    

                    <CategoryAddNew></CategoryAddNew>

                </div>
            </div>

        </div>
    );
};

export default Categories;