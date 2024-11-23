import { useCallback, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDropzone } from "react-dropzone";
import { MdCancel, MdCloudUpload } from "react-icons/md";

const ReactFIleInput = ({ setProductImages, formReset, setFormReset }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [droppableId, setDroppableId] = useState("droppableId");

  //   console.log(previewImages);

  const [alertMessage, setAlertMessage] = useState("");

  const onDrop = useCallback(
    (acceptedFile) => {
      if (selectedFiles.length + acceptedFile.length > 7) {
        return setAlertMessage("You can only upload up to 7 files.");
      }
      const allFiles = [...selectedFiles, ...acceptedFile];
      setSelectedFiles(allFiles);
      setProductImages(allFiles);
      setAlertMessage("");

      acceptedFile.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreviewImages((prevImage) => [...prevImage, reader.result]);
        };
      });
    },
    [selectedFiles, setProductImages]
  );

  const removeItem = (index) => {
    
    setPreviewImages((prevImage) => prevImage.filter((_, i) => i !== index));
    const remainingImages = selectedFiles.filter((_, i) => i !== index);

    setSelectedFiles(remainingImages);
    setProductImages(remainingImages);
  };

  //reordering image
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedPreviews = Array.from(previewImages);
    const [reorderedPreview] = reorderedPreviews.splice(result.source.index, 1);
    reorderedPreviews.splice(result.destination.index, 0, reorderedPreview);
    setPreviewImages(reorderedPreviews);

    const reorderedSelectedFiles = Array.from(selectedFiles);
    const [reorderedSelectedFile] = reorderedSelectedFiles.splice(
      result.source.index,
      1
    );
    reorderedSelectedFiles.splice(
      result.destination.index,
      0,
      reorderedSelectedFile
    );
    setSelectedFiles(reorderedSelectedFiles);
    setProductImages(reorderedSelectedFiles);
  };

  useEffect(() => {
    if (selectedFiles.length) {
      setDroppableId("selectedImages");
    }
    if(formReset){
        setPreviewImages([]);
        setSelectedFiles([]);
        setProductImages([]);
        setFormReset(false);
    }
  }, [selectedFiles.length, setFormReset, formReset, setProductImages]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });
  return (
    <div className="w-full space-y-2">
      <div
        {...getRootProps()}
        className="border min-h-28 border-dashed p-2 cursor-pointer"
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center min-h-28">
          <span className="text-4xl">
            <MdCloudUpload />
          </span>
          <p className="text-center">
            {" "}
            Drag n drop some files here, or click to select files (Max 7 files)
          </p>

          {alertMessage && (
            <p className="text-orange-500 text-center py-2">{alertMessage}</p>
          )}
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={droppableId} direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-3 gap-2 md:flex"
            >
              {previewImages.map((image, index) => (
                <Draggable
                  draggableId={`image${index}`}
                  index={index}
                  key={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="relative w-24 h-28 md:w-28 mr-2 md:h-32"
                    >
                      <img
                        src={image}
                        className="w-full h-full me-2 inline-block"
                      />
                      <span
                        onClick={() => removeItem(index)}
                        className="absolute z-40 text-2xl cursor-pointer text-[#ff3811] right-0 top-0"
                      >
                        <MdCancel />{" "}
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
  );
};

export default ReactFIleInput;
