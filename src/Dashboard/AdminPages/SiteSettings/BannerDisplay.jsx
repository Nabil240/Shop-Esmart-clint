import { useEffect, useState } from "react";
import WaitingLoader from "../../../Component/WaitingLoader/WaitingLoader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { MdCancel } from "react-icons/md";
import {
  confirmAlert,
  failedAlert,
} from "../../../Component/SweetAlart/SweelAlart";

const BannerDisplay = ({ banners, bannerId, isPending, refetch }) => {
  const [existingImages, setExistingImages] = useState([]);
  const [droppableId, setDroppableId] = useState("droppableId");
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (banners) {
      setExistingImages(banners);
    }
  }, [banners]);

  useEffect(() => {
    if (existingImages.length) {
      setDroppableId("selectedImages");
    }
  }, [existingImages.length]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedPreviews = Array.from(existingImages);
    const [reorderedPreview] = reorderedPreviews.splice(result.source.index, 1);
    reorderedPreviews.splice(result.destination.index, 0, reorderedPreview);
    setExistingImages(reorderedPreviews);
  };

  const handleRemoveImage = async (image_id) => {
    setIsLoading(true);
    const res = await axiosSecure.post("/site-settings/banner/delete", {
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

  const handleBannerUpadate = async () => {
    try {
      setIsLoading(true);
      const res = await axiosSecure.put(
        `/site-settings/banners/${bannerId}`,
        existingImages
      );
      if (res.data.matchedCount > 0) {
        confirmAlert("Update Success!");
        refetch();
      }
    } catch (err) {
      return failedAlert("Update Failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isPending ||
        (isLoading && (
          <div>
            <WaitingLoader></WaitingLoader>
          </div>
        ))}
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={droppableId} direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex  flex-wrap"
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
                        className="relative p-1 md:flex-[1_1_calc(15%)]  flex-[1_1_calc(33.333%)]  "
                      >
                        <img
                          className="w-full h-full object-cover"
                          src={image.image_url}
                        />
                        <span
                          onClick={() => handleRemoveImage(image.image_id)}
                          className="absolute z-40 text-3xl cursor-pointer text-[#ff3811] right-0 top-0"
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
      <div className="w-1/2 mx-auto my-5">
        <button
          onClick={handleBannerUpadate}
          className="py-2 bg-[#ff3811] hover:bg-[#b63a21] rounded-sm w-full text-center text-white"
        >
          Update Banner
        </button>
      </div>
    </div>
  );
};

export default BannerDisplay;
