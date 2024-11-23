import useBannerLoad from "../../../hooks/useBannerLoad";
import BannerDisplay from "./BannerDisplay";
import BannerUpload from "./BannerUpload";

const SiteSettings = () => {
    const [bannersData, isPending, refetch] = useBannerLoad(); 
    
    return (
        <div>
            <h2 className="text-2xl md:text-4xl text-center py-4">Site Settings</h2>
            <div className="space-y-6 md:max-w-6xl mx-auto p-4 md:p-0">
                <div>
                    {/* for image upload */}
                    <BannerUpload></BannerUpload>
                </div>

                <div>
                    {/* for image display */}
                    <BannerDisplay banners={bannersData[0]?.banners} bannerId={bannersData[0]?._id} refetch={refetch} isPending={isPending}></BannerDisplay>
                </div>

            </div>
        </div>
    );
};

export default SiteSettings;