import { useState } from "react";
import useCategories from "../../../hooks/useCategories";
import ReactTagInput from "../../../Component/ReactTagInput/ReactTagInput";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ReactFIleInput from "../../../Component/ReactFileInput/ReactFIleInput";
import { upoloadImageToCloudinary } from "../../../Component/CloudinaryImageHost/CloudinaryImageHost";
import WaitingLoader from "../../../Component/WaitingLoader/WaitingLoader";
import {
  confirmAlert,
  failedAlert,
} from "../../../Component/SweetAlart/SweelAlart";
import { calculateFinalPriceAndProfit } from "../../../utils/modules";

const AddNewProduct = () => {
  const axiosSecure = useAxiosSecure();

  const [categories] = useCategories();

  const [collectProductTags, setCollectProductTags] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formReset, setFormReset] = useState(false);

  const handleAddNewProduct = async (e) => {
    e.preventDefault();

    if (productImages.length === 0) {
      failedAlert("Image Cannot Emty!");
      return;
    }

    const form = new FormData(e.target);
    const productName = form.get("productName");
    const productCategory = form.get("productCategory").split(",");
    const productDetails = form.get("productDetails");
    const productCode = form.get("productCode");
    const sellPrice = parseInt(form.get("sellPrice"));
    const costPrice = parseInt(form.get("costPrice"));
    const discountPercent = parseInt(form.get("discountPercent"));
    const stockStatus = form.get("stockStatus") === "true";
    const stockQuantity = parseInt(form.get("stockQuantity"));
    const productBrand = form.get("productBrand");
    const productTags = collectProductTags.map((tag) => tag.text);
    const { finalPrice, profit, discountAmount } = calculateFinalPriceAndProfit(
      costPrice,
      sellPrice,
      discountPercent
    );

    if (!productCategory) {
      failedAlert("Category Must be Add");
      return;
    }
    setLoading(true);
    const uploadedImageUrls = await Promise.all(
      productImages.map(async (imageFile) => {
        const res = await upoloadImageToCloudinary(imageFile);
        if (res) {
          return { image_id: res.public_id, image_url: res.secure_url };
        }

        return null;
      })
    );

    // console.log("inside add new product page", uploadedImageUrls);

    if (!uploadedImageUrls.every((image) => image)) {
      failedAlert("Image upload failed. Please try again.");
      setLoading(false);
      return;
    }

    const productInformation = {
      productName,
      productCategory,
      productDetails,
      productCode,
      sellPrice,
      costPrice,
      discountPercent,
      finalPrice,
      profit,
      discountAmount,
      stockStatus,
      stockQuantity,
      productBrand,
      productTags,
      images: uploadedImageUrls,
    };

    // console.log(productInformation);
    try {
      const res = await axiosSecure.post(
        "/products/addnew",
        productInformation
      );
      // console.log(res.data);
      if (res.data.insertedId) {
        confirmAlert("Product added successfully!");
        e.target.reset();
        setCollectProductTags([]);
        setProductImages([]);
        setFormReset(true);
      }
    } catch (err) {
      failedAlert("Failed to Add new Product!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:max-w-6xl mx-auto p-3 md:p-0 mb-10">
      <h2 className="text-2xl md:text-4xl text-center py-4">Add New Product</h2>
      {loading && <WaitingLoader></WaitingLoader>}
      <div>
        <form onSubmit={handleAddNewProduct}>
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-3">
            <div className="space-y-2">
              <label className="text-2xl" htmlFor="productName">
                Product Name
              </label>
              <input
                type="text"
                className="w-full py-1 px-2 rounded-sm border"
                placeholder="Product Name"
                required
                name="productName"
              />
            </div>
            <div className="space-y-2">
              <label className="text-2xl" htmlFor="productCategory">
                Product Category
              </label>
              <select
                name="productCategory"
                defaultValue={"default"}
                required
                className="w-full py-[5px] border px-2 capitalize"
              >
                <option disabled value={"default"}>
                  Select a Category
                </option>
                {categories.map((category) => (
                  <option
                    key={category._id}
                    className="capitalize py-1"
                    value={category.categoryName}
                  >
                    {category.categoryName[1]}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-2xl" htmlFor="productDetails">
                Product Description
              </label>
              <textarea
                rows={1}
                className="w-full py-1 px-2 rounded-sm border"
                required
                name="productDetails"
              ></textarea>
            </div>
            <div className="space-y-2">
              <label className="text-2xl" htmlFor="productCode">
                Product Code
              </label>
              <input
                className="w-full py-1 px-2 rounded-sm border"
                type="text"
                placeholder="Product Code ( any )"
                required
                name="productCode"
              />
            </div>
            <div className="space-y-2">
              <label className="text-2xl" htmlFor="sellPrice">
                Sell Price
              </label>
              <input
                className="w-full py-1 px-2 rounded-sm border"
                type="number"
                placeholder="Sell Price (provide number)"
                min={0}
                required
                name="sellPrice"
              />
            </div>
            <div className="space-y-2">
              <label className="text-2xl" htmlFor="costPrice">
                Cost Price
              </label>
              <input
                className="w-full py-1 px-2 rounded-sm border"
                type="number"
                placeholder="Cost Price (provide number)"
                min={0}
                required
                name="costPrice"
              />
            </div>
            <div className="space-y-2">
              <label className="text-2xl" htmlFor="discountPercent">
                Discount Percent
              </label>
              <input
                className="w-full py-1 px-2 rounded-sm border"
                type="number"
                defaultValue={0}
                min={0}
                placeholder="Discount Price calculate % percentage (provide number)"
                name="discountPercent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-2xl" htmlFor="stockStatus">
                Stock Status
              </label>
              <select
                name="stockStatus"
                defaultValue={"default"}
                required
                className="w-full py-[5px] border px-2 capitalize"
              >
                <option disabled value={"default"}>
                  Set Stock Status
                </option>
                <option value={true}>Available</option>
                <option value={false}>Unavailable</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-2xl" htmlFor="stockQuantity">
                Stock Quantity
              </label>
              <input
                type="number"
                className="w-full py-1 px-2 rounded-sm border"
                placeholder="Stock Quantity (provide number)"
                min={0}
                required
                name="stockQuantity"
              />
            </div>
            <div className="space-y-2">
              <label className="text-2xl" htmlFor="productBrand">
                Product Brand
              </label>
              <input
                type="text"
                className="w-full py-1 px-2 rounded-sm border"
                placeholder="Product Brand (optional)"
                name="productBrand"
              />
            </div>
            <div className="space-y-2">
              <label className="text-2xl" htmlFor="productTag">
                Product Tag
              </label>
              <ReactTagInput
                setCollectProductTags={setCollectProductTags}
                formReset={formReset}
              ></ReactTagInput>
            </div>

            <div className="md:col-span-2">
              <ReactFIleInput
                setProductImages={setProductImages}
                setFormReset={setFormReset}
                formReset={formReset}
              />
            </div>

            <div className="md:col-span-2">
              <div className="w-1/2 mx-auto">
                {loading ? (
                  <button
                    disabled={loading}
                    className={`w-full bg-gray-400 text-white py-2 rounded-sm outline-none`}
                  >
                    Add Product
                  </button>
                ) : (
                  <button
                    className={`w-full bg-[#ff3811] text-white py-2 rounded-sm outline-none`}
                  >
                    Add Product
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewProduct;
