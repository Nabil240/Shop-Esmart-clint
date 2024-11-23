import { Link, useNavigate, useRouteError } from "react-router-dom";
import Button from "../Button";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import Footer from "../../Pages/Shared/Footer/Footer";

const ErrorPage = () => {
    const error = useRouteError();
    console.log(error)
  const navigate = useNavigate();

  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-col justify-start md:justify-center mt-10 text-center items-center space-y-4">
        <div className="space-y-3">
        
          <p className="text-6xl font-bold">{error.status}</p>
          <h2 className="text-4xl font-bold">Oops !</h2>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </div>

        <div className="flex md:gap-x-8 gap-x-3 items-center">
          <div onClick={() => navigate(-1)}>
            {" "}
            <Button buttonText={"Go Back"} />
          </div>
          <div>
            <Link to={"/"}>
              <Button buttonText={"Home"} />
            </Link>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default ErrorPage;
