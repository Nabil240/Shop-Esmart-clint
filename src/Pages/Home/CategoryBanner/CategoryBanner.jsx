import { Link } from "react-router-dom";
import useCategories from "../../../hooks/useCategories";

const CategoryBanner = () => {
  const [categories] = useCategories();

  return (
    <div
      data-aos="fade-right"
      data-aos-duration="1500"
      className="order-2 md:h-[500px] col-span-4 md:col-span-1 grid md:grid-cols-2 grid-cols-4 shadow-lg dark:shadow-slate-900 "
    >
      {categories?.map((category) => (
        <Link key={category._id} to={`/category/${category.categoryName[1]}`}>
          <div className="flex flex-col items-center justify-center w-full h-16 text-sm font-semibold uppercase transition duration-500 transform md:h-full hover:scale-110 dark:hover:bg-slate-700 dark:hover:shadow-slate-900 hover:bg-slate-100 hover:shadow-lg md:text-base">
            <p className="w-3/4 mx-auto text-center text-wrap">
              {category.categoryName[1]}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryBanner;
