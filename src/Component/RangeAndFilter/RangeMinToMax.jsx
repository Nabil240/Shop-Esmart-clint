import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const RangeMinToMax = ({ setPriceRange }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [range, setRange] = useState({ min: "", max: "" });
  const [error, setError] = useState("");
  

  const handlePriceRange = (data) => {
    let min_value = parseInt(data.min);
    let max_value = parseInt(data.max);
    setError("");

    if ((min_value === 0 && max_value === 0) || min_value === max_value) {
      setError("Minimum & Maximum cannot be the Same");
      return;
    }

    if (min_value > max_value) {
      [min_value, max_value] = [max_value, min_value];
    }

    setValue("min", min_value);
    setValue("max", max_value);
    setRange({ min: min_value, max: max_value });
    
  };

  useEffect(()=>{
    if(range.min && range.max){

      setPriceRange(range);
    }
  },[range, setPriceRange])

  return (
    <div className="w-[55%] " data-aos="fade-right" data-aos-duration="1500">
      <p className="text-base md:text-xl">Price Range</p>
      <form
        onSubmit={handleSubmit(handlePriceRange)}
        className="flex gap-1 md:gap-2 items-center md:text-lg text-sm"
      >
        <input
          type="number"
          name="min"
          {...register("min", { required: true, min: 0 })}
          placeholder="min"
          min={0}
          defaultValue={range.min}
          className="border rounded-md outline-none py-[1px] ps-1 w-12 md:w-20"
        />
        <span>To</span>
        <input
          type="number"
          name="max"
          {...register("max", { required: true, min: 0 })}
          placeholder="max"
          min={0}
          defaultValue={range.max}
          className="border rounded-md outline-none py-[1px] ps-1 w-14 md:w-20"
        />
        <input
          type="submit"
          className={`md:px-4 rounded-md px-2 py-[2px] bg-[#ff3811] hover:bg-[#b12509] text-white cursor-pointer`}
          value={"Show"}
        />
      </form>
      {(errors.min && (
        <p className="text-red-500 absolute text-xs md:text-[16px]">
          Minimum value cannot be blank.
        </p>
      )) ||
        (errors.max && (
          <p className="text-red-500 absolute text-xs md:text-[16px]">
            Maximum value is mandatory.
          </p>
        )) ||
        (error && (
          <p className="text-red-500 absolute text-xs md:text-[16px]">
            {error}
          </p>
        ))}
    </div>
  );
};

export default RangeMinToMax;
