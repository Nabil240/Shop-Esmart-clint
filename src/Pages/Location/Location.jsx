import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";

const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

const AnyReactComponent = ({ lat, lng, text }) => {
  const handleClick = () => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  };

  return (
    <div
      className="flex-col flex items-center text-nowrap text-[#ff3811] text-4xl cursor-pointer"
      onClick={handleClick}
    >
      <FaMapMarkerAlt />
      <span className="text-xl">{text}</span>
    </div>
  );
};

const Location = () => {
  const defaultProps = {
    center: {
      lat: 23.8048,
      lng: 90.3667,
    },
    zoom: 14,
  };

  return (
    <div
      className="my-5 md:max-w-6xl md:mx-auto"
      
    >
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.97303518621!2d90.33728829734353!3d23.78081863557593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2z4Kai4Ka-4KaV4Ka-!5e0!3m2!1sbn!2sbd!4v1730573994707!5m2!1sbn!2sbd" style={{ height: "75vh", width: "100%" }}  allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
          text="Shop Esmart"
        />
      </GoogleMapReact> */}
    </div>
  );
};

export default Location;
