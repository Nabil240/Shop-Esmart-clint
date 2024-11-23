
const Button = ({buttonText}) => {
    return (
        <button className="bg-[#FF3811] text-base md:text-xl text-white hover:bg-[#ca1e0b] px-6  md:font-semibold py-2 rounded-md">
            {buttonText}
        </button>
    );
};

export default Button;