import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const NavSearchBox = () => {
  const location = useLocation(); 
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${query}`)
  };

  useEffect(()=>{
    if(location.pathname !== '/search'){
      setQuery("")
    }
  },[location])

  

  return (
    <form className="flex items-center relative">
      <input
        type="text"
        name="searchText"
        value={query}
        className="w-full outline-none border text-black dark:text-white border-[#FF3811] md:py-2 pl-3 md:pl-5 pr-8 md:pr-14 md:text-xl l  py-1 rounded-lg"
        placeholder="Search Product..."
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <button
        onClick={handleSearch}
        type="submit"
        disabled={!query}
        className={`md:text-2xl ${
          query ? "text-[#FF3811]" : "disabled text-gray-300"
        }  absolute md:right-5 right-2`}
      >
        <FaSearch className=""></FaSearch>
      </button>
    </form>
  );
};

export default NavSearchBox;
