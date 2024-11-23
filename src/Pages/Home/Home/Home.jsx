import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import CategoryBanner from "../CategoryBanner/CategoryBanner";
import HotPicks from "../HotPicks/HotPicks";
import ForYouProduct from "../ForYouProduct/ForYouProduct";

//TODO : Helmet set
//TODO : Props Validation



const Home = () => {
  return (
    <section className="mt-3 md:mt-6">
      <Helmet>
        <title>Shop Esmart  | Home</title>
      </Helmet>

      {/* brand promotion cover or slider and category section  */}
      <div className="grid grid-cols-4">
        <CategoryBanner></CategoryBanner>
        <Banner></Banner>
      </div>

      {/* Hot Picks */}
      <div className="px-3 mx-auto mt-4 md:max-w-[90%] md:px-0">
        <HotPicks></HotPicks>
      </div>

      {/* For You  */}
      <div className="px-3 mx-auto mt-4 md:max-w-[90%] md:px-0">
        <ForYouProduct></ForYouProduct>
      </div>
    </section>
  );
};

export default Home;
