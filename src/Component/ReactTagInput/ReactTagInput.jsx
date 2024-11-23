import { useEffect, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";

const ReactTagInput = ({ setCollectProductTags, formReset }) => {
  const [tags, setTags] = useState([]);
 
  const handleDelete = (i) => {
    const newTags = tags.filter((_, index) => index !== i);
    setTags(newTags);

    setCollectProductTags(newTags);
  };

  const handleAdition = (tag) => {
    const newTags = [...tags, tag]
    setTags(newTags);
    setCollectProductTags(newTags);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
    setCollectProductTags(newTags);
  };

  useEffect(()=>{
    if(formReset){
      setTags([]);
    }
  },[formReset])
  return (
    <div className="w-full  border rounded-sm">
      <ReactTags
        tags={tags}
        handleDelete={handleDelete}
        handleAddition={handleAdition}
        handleDrag={handleDrag}
        inputFieldPosition="inline"
        placeholder="Enter tags and press Enter"
        editable
        classNames={{
          tagInputField: "w-full py-[5px] px-2 outline-none",
          tags: "flex flex-wrap items-center gap-1",
          tagInput: "flex-grow text-nowrap   items-center",
          tag: "bg-blue-500  text-white ms-1 text-nowrap py-1 ps-2 rounded",
          remove: " p-[10px]  cursor-pointer",
        }}
      />
    </div>
  );
};

export default ReactTagInput;
