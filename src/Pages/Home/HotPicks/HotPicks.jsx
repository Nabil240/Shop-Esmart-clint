import { Link } from "react-router-dom";
import { FaFire } from "react-icons/fa";
import ProductsSlider from "../../../Component/ProductsSlider/ProductsSlider";
import WaitingLoader from "../../../Component/WaitingLoader/WaitingLoader";
import useHotPicks from "../../../hooks/useHotPicks";

const HotPicks = () => {
    const path = 'products-hotPicks'; 
    const dataLoad = 10; 
    const {collections, totalResult, loading} = useHotPicks({path, dataLoad})
    
    return (
        <section >
            {loading && <WaitingLoader></WaitingLoader>}
            <div className="flex justify-between mb-3 md:mb-5">
                <h2 className="flex items-center gap-2 text-xl font-bold md:text-3xl">Hot Picks <span className="text-[#FF3811] text-2xl"><FaFire />    </span>            </h2>
                <Link to={`/products/${path}`}><button className="border px-3 md:px-5 py-1 md:py-2 border-[#FF3811] text-center text-[#FF3811] hover:bg-[#FF3811] hover:text-white">See More</button></Link>
            </div>

            <div>

                <ProductsSlider path={path} collections={collections} totalResult={totalResult}/>
            </div>
            
        </section>
    );
};

export default HotPicks;