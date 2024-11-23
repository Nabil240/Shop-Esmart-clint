
const SearchTextButton = ({setSearchText, placeholder = 'Search by Phone, Email, Transaction ID, Order ID'}) => {
    const handleSearchText = (e) => {

        e.preventDefault();

        
        setSearchText(e.target.searchText.value);
      };
    return (
        <div className="md:w-1/2 mx-auto w-80 mb-7">
        <form onSubmit={handleSearchText} className="flex">
          <input
            type="text"
            className="w-full px-2 py-1 border border-e-0 outline-none"
            name="searchText"
            placeholder={placeholder}
          />
          <input
            type="submit"
            value="Search"
            className="py-1 px-4 text-white bg-[#ff3811] hover:bg-red-700"
          />
        </form>
      </div>
    );
};

export default SearchTextButton;