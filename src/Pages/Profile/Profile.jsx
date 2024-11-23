import HomeAndBackButton from "../../Component/HomeAndBackButton/HomeAndBackButton";
import ProfileAddress from "./ProfileAdress/ProfileAddress";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import ProfilePicture from "./ProfilePicture/ProfilePicture";

const Profile = () => {
  return (
    <div className="my-3 md:max-w-6xl mx-auto px-2 md:px-0">
      <HomeAndBackButton></HomeAndBackButton>
      <div className="md:grid grid-cols-3 gap-3">
        <div className="col-span-1">
          <ProfilePicture></ProfilePicture>
          <ProfileMenu></ProfileMenu>
        </div>

        <div className="col-span-2">
          <ProfileAddress />
        </div>
      </div>
    </div>
  );
};

export default Profile;
