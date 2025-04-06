import {v2 as cloudinary} from "cloudinary";
import exp from "constants";
import fs from "fs"; //filesystem(does read,write remove all these etc things)

    // Configuration
    cloudinary.config({
        cloud_name: "dvhyctrys",  
        // api_key: process.env.CLOUDINARY_API_KEY,       
        api_key: 261841335416924,     
        // api_secret: process.env.CLOUDINARY_API_SECRET,
        api_secret:"8oH1MOQI3kjDqWKOkSk9n9K2E8k",
          // No quotes around process.env
    });


// const uploadOnCloudinary = async (localFilePath) =>{  //  for upload file in cloudinary
//     try {
//         if(! localFilePath) return null; 
//         //uplaod the file on cloudinary
//         const response=await cloudinary.uploader.upload(localFilePath,{  // if takes time use await
//             resource_type:"auto"
//         })
//         //file uploaded successfully
//         console.log("file is uploaded on cloudinary",response.url);
//         return response;
        
//     } catch (error) {
        
//         fs.unlinkSync(localFilePath) //remove locally saved temp fl=ile as the upload opn got failed
//         return null;
//     }
// }


export const uploadOnCloudinary = async (filePath) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(filePath, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};

// export {uploadOnCloudinary}