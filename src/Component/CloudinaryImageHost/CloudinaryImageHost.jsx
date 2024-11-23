import { Cloudinary } from "cloudinary-core";



const cloudinary = new Cloudinary({
    cloud_name : import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    api_key : import.meta.env.VITE_CLOUDINARY_API_KEY,
    api_secret : import.meta.env.VITE_CLOUDINARY_API_SECRET
})

export const upoloadImageToCloudinary = async(imageFile) =>{


    const formData = new FormData(); 
    formData.append('file', imageFile);
    formData.append('upload_preset', 'shopEsmart'); 
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/image/upload`, {
        method: "POST",
        body: formData,
    });

    const data = await response.json(); 
    return data;

}
