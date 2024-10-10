import {v2 as cloudinary} from "cloudinary";
import exp from "constants";
import fs from "fs"; //filesystem(does read,write remove all these etc things)

    // Configuration
    cloudinary.config({ 
        cloud_name: 'process.env.CLOUDINARY_CLOUD_NAME', 
        api_key: 'process.env.CLOUDINARY_API_KEY', 
        api_secret: 'process.env.CLOUDINARY_API_SECRET' 
    });


const uploadOnCloudinary = async (localFilePath) =>{  //  for upload file in cloudinary
    try {
        if(! localFilePath) return null; 
        //uplaod the file on cloudinary
        const response=await cloudinary.uploader.uplaod(localFilePath,{  // if takes time use await
            resource_type:"auto"
        })
        //file uploaded successfully
        console.log("file is uploaded on cloudinary",response.url);
        return response;
        
    } catch (error) {
        
        fs.unlinkSync(localFilePath) //remove locally saved temp fl=ile as the upload opn got failed
        return null;
    }
}

export {uploadOnCloudinary}