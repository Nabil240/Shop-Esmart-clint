const LoadMoreButton = ({ setDataLoad, isPending }) => {
  return (
    <div className="my-5 md:w-96 w-40 mx-auto">
      {isPending ? (
        <button disabled className="w-full bg-[#ff3811]  py-2 text-center text-white">
          Loading...
        </button>
      ) : (
        <button
          onClick={() => setDataLoad((prev) => prev + 10)}
          className="w-full bg-[#ff3811] hover:bg-red-700 py-2 text-center text-white"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default LoadMoreButton;
