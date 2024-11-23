import { useParams } from "react-router-dom";
import WaitingLoader from "../../Component/WaitingLoader/WaitingLoader";
import useCategories from "../../hooks/useCategories";
import useSingleProductReadForAdmin from "../../hooks/useSingleProductReadForAdmin";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  confirmAlert,
  failedAlert,
} from "../../Component/SweetAlart/SweelAlart";
import { calculateFinalPriceAndProfit } from "../../utils/modules";
import { useEffect, useState } from "react";
import { upoloadImageToCloudinary } from "../../Component/CloudinaryImageHost/CloudinaryImageHost";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ReactTagInput from "../../Component/ReactTagInput/ReactTagInput";
import ReactFIleInput from "./../../Component/ReactFileInput/ReactFIleInput";
import { MdCancel } from "react-icons/md";

const UpdateProduct = () => {
  const { id } = useParams();
  const { productDetails, loading , refetch} = useSingleProductReadForAdmin(id);
  const [categories] = useCategories();
  const [isLoading, setIsLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [collectProductTags, setCollectProductTags] = useState([]);
  const [finalProductTags, setFinalProductTags] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [droppableId, setDroppableId] = useState("droppableId");
  const [formReset, setFormReset] = useState(false);


  useEffect(() => {
    if (productDetails.productTags) {
      setFinalProductTags(productDetails.productTags);
    }
  }, [productDetails.productTags]);
  useEffect(() => {
    if (productDetails.images) {
      setExistingImages(productDetails.images);
    }
  }, [productDetails.images]);
  useEffect(() => {
    if (existingImages.length) {
      setDroppableId("selectedImages");
      setFormReset(false);
    }
  }, [existingImages.length]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedPreviews = Array.from(existingImages);
    const [reorderedPreview] = reorderedPreviews.splice(result.source.index, 1);
    reorderedPreviews.splice(result.destination.index, 0, reorderedPreview);
    setExistingImages(reorderedPreviews);
  };

  const handleTagDelete = (tagToRemove) => {
    const updateTags = finalProductTags.filter((tag) => tag !== tagToRemove);
    setFinalProductTags(updateTags);
  };

  const handleRemoveImage = async (image_id) => {
    //Todo: delete from cloudinary
    setIsLoading(true);
    const res = await axiosSecure.post("/delete-image", {
      public_id: image_id,
    });
    if (res.data.result === "ok") {
      const remainingImages = existingImages.filter(
        (image) => image.image_id !== image_id
      );
      setExistingImages(remainingImages);
      setIsLoading(false);
      return;
    }
  };

  const handleUploadImage = async () => {
    setIsLoading(true);
    const uploadedImageUrls = await Promise.all(
      productImages.map(async (imageFile) => {
        const res = await upoloadImageToCloudinary(imageFile);
        if (res) {
          return { image_id: res.public_id, image_url: res.secure_url };
        }

        return null;
      })
    );

    if (!uploadedImageUrls.every((image) => image)) {
      failedAlert("Image upload failed. Please try again.");
      setIsLoading(false);
      return;
    }
    const updatedImage = [...existingImages, ...uploadedImageUrls];

    setExistingImages(updatedImage);
    setFormReset(true);
    setIsLoading(false);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

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
    const productTags = [
      ...finalProductTags,
      ...collectProductTags.map((tag) => tag.text),
    ];
    const { finalPrice, profit, discountAmount } = calculateFinalPriceAndProfit(
      costPrice,
      sellPrice,
      discountPercent
    );

    if (!productCategory) {
      failedAlert("Category Must be Add");
      return;
    }
    setIsLoading(true);

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
      images: existingImages,
    };

    try {
        const res = await axiosSecure.put(
          `/products/update/${id}`,
          productInformation
        );
        if (res.data) {
          confirmAlert("Product Update success!");
          setFormReset(true);
          refetch();
        }
    } 
    catch (err) {
        failedAlert("Failed to Update Product!");
      }
    finally {
      
      setIsLoading(false);
    }
  };
  return (
    <div className="md:max-w-6xl mx-auto p-3 md:p-0 mb-10">
      <h2 className="text-2xl md:text-4xl text-center py-4">
        Update a Product
      </h2>
      {(loading || isLoading) && (
        <div>
          <WaitingLoader></WaitingLoader> 
        </div>
      )}
      <div>
        <form onSubmit={handleUpdateProduct}>
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-3">
            <div className="space-y-2">
              <label className="text-2xl" htmlFor="productName">
                Product Name
              </label>
              <input
                defaultValue={productDetails.productName}
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
                required
                className="w-full py-[5px] border px-2 capitalize"
              >
                <option value={productDetails.productCategory}>
                  {productDetails.productCategory[1]}
                </option>
                {categories.map(
                  (category) =>
                    category.categoryName[1] !==
                      productDetails.productCategory[1] && (
                      <option
                        key={category._id}
                        className="capitalize py-1"
                        value={category.categoryName}
                      >
                        {category.categoryName[1]}
                      </option>
                    )
                )}
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
                defaultValue={productDetails.productDetails}
              ></textarea>
            </div>
            <div className="space-y-2">
              <label className="text-2xl" htmlFor="productCode">
                Product Code
              </label>
              <input
                className="w-full py-1 px-2 rounded-sm border"
                type="text"
                defaultValue={productDetails.productCode}
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
                defaultValue={productDetails.sellPrice}
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
                defaultValue={productDetails.costPrice}
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
                defaultValue={productDetails.discountPercent}
                className="w-full py-1 px-2 rounded-sm border"
                type="number"
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
                defaultValue={productDetails.stockStatus}
                required
                className="w-full py-[5px] border px-2 capitalize"
              >
                {productDetails?.stockStatus ? (
                  <option value={productDetails.stockStatus}>Available</option>
                ) : (
                  <option value={productDetails.stockStatus}>
                    Unavailable
                  </option>
                )}
                <option value={true}>Available</option>
                <option value={false}>Unavailable</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-2xl" htmlFor="stockQuantity">
                Stock Quantity
              </label>
              <input
                defaultValue={productDetails.stockQuantity}
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
                defaultValue={productDetails.productBrand}
                type="text"
                className="w-full py-1 px-2 rounded-sm border"
                placeholder="Product Brand (optional)"
                name="productBrand"
              />
            </div>
            <div>
              <div className="space-y-2">
                <label className="text-2xl" htmlFor="productTag">
                  Product Tag
                </label>
                <ReactTagInput
                  setCollectProductTags={setCollectProductTags}
                  formReset={formReset}
                ></ReactTagInput>
              </div>
              <div className="mt-2">
                {finalProductTags.map((tag, index) => (
                  <p
                    key={index}
                    className="inline-block m-1 bg-green-500 ps-2 pe-8 py-[2px] relative text-white"
                  >
                    <span>{tag}</span>{" "}
                    <span
                      onClick={() => handleTagDelete(tag)}
                      className="absolute right-2 cursor-pointer"
                    >
                      X
                    </span>
                  </p>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={droppableId} direction="horizontal">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="grid grid-cols-3 gap-2 md:flex"
                    >
                      {existingImages.map((image, index) => (
                        <Draggable
                          draggableId={image.image_id}
                          index={index}
                          key={image.image_id}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="relative inline-block w-24 h-28 md:w-28 mr-2 md:h-32"
                            >
                              <img
                                className="w-full h-full me-2 "
                                src={image.image_url}
                              />
                              <span
                                onClick={() =>
                                  handleRemoveImage(image.image_id)
                                }
                                className="absolute z-40 text-2xl cursor-pointer text-[#ff3811] right-0 top-0"
                              >
                                <MdCancel />
                              </span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            <div className="md:col-span-2">
              <ReactFIleInput
                formReset={formReset}
                setFormReset={setFormReset}
                setProductImages={setProductImages}
              />
            </div>

            <div className="md:col-span-2">
              <div className="w-1/2 mx-auto">
                {loading ? (
                  <button
                    disabled={loading}
                    className={`w-full bg-gray-400 text-white py-2 rounded-sm outline-none`}
                  >
                    Product Update
                  </button>
                ) : productImages.length ? (
                  <span
                    onClick={handleUploadImage}
                    className={`w-full block text-center cursor-pointer bg-blue-500 hover:bg-blue-800 text-white py-2 rounded-sm outline-none`}
                  >
                    Image Upload
                  </span>
                ) : (
                  <button
                    className={`w-full bg-[#ff3811] hover:bg-[#c22202] text-white py-2 rounded-sm outline-none`}
                  >
                    Product Update
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

export default UpdateProduct;
