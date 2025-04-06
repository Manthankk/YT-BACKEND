// import { asyncHandler } from "../utils/asyncHandler.js"; 
// import  {ApiError} from "../utils/ApiError.js";
// import {User } from "../models/user.model.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import { ApiResponse } from "../utils/ApiResponse.js";


// const registerUser = asyncHandler(async (req, res) => {

//     // get user details 
//     //valiodation
//     //check if user already exists
//     //check for images,avatar
//     //upload them to cloudnary,avatar
//     //create user object-create enrty in db
//     //remove password and referesh token field
//     //check for user creation
//     //return res


//     // res.status(200).json({
//     //     message: "Keep doing it"
//     // });


//     const {fullName,email,username,password} =req.body
//     console.log("email:",email);

//     if(
//         [fullName,email,username,password].some((field) => field?.trim() === "")
//     ){
//         throw new ApiError(400,"All fileds are required")
//     }

//     const existedUser=await User.findOne({
//         $or:[{ username },{ email }]
//     })

//     if(existedUser){
//         throw new ApiError(409,"User with email or username already exists")
//     }

//     const avatarLocalPath= req.files?.avatar[0]?.path
//     const avatarImageLocalPath= req.files?.coverImage[0]?.
//     path;

//     if(!avatarLocalPath){
//         throw new ApiError(400,"Avatar file is required")
//     }
//     //upload to cloudinary   if req more time use await
//     const avatar=await uploadOnCloudinary(avatarLocalPath)
//     const coverImage=await uploadOnCloudinary(avatarImageLocalPath)

//     if(!avatar){
//         throw new ApiError(400,"Avatar file is required")
//     }

//     //if taken more time

//     const user=await Username.create({
//         fullName,
//         avatar:avatar.url,
//         coverImage:coverImage?.url || "",
//         email,
//         password,
//         username:username.toLowerCase()
//     })
//  // using the .select method we can pass the fields which we need
//     const createdUser=await User.findById(user._id).select(
//         "-password -refreshToken" //use space here   - menas dont take  it
//     )
//     if(!createdUser){
//         throw new ApiError(500,"Something went wrong while registering thr user ")
//     }

//     return res.status(201).json(
//         new ApiResponse(200,createdUser,"User registered successfully")
//     )
// })

// export { registerUser, };


import { asyncHandler } from "../utils/asyncHandler.js"; 
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from 'fs'; // Import fs module to check file existence

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;
    console.log("email:", email);

    // Validate input fields
    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const existedUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    // console.log(req.files)
    // Check for avatar and cover  image uploads
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    

    console.log("Avatar file path:", avatarLocalPath);

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // Check if the avatar file exists
    if (!fs.existsSync(avatarLocalPath)) {
        throw new ApiError(400, "Avatar file does not exist");
    }

    // Upload to Cloudinary
    let avatar, coverImage;
    try {
        avatar = await uploadOnCloudinary(avatarLocalPath);
        console.log("Avatar upload result:", avatar);
    } catch (error) {
        console.error("Error uploading avatar to Cloudinary:", error);
        throw new ApiError(500, "Failed to upload avatar to Cloudinary");
    }

    // Upload cover image if it exists
    if (avatarImageLocalPath) {
        try {
            coverImage = await uploadOnCloudinary(avatarImageLocalPath);
            console.log("Cover image upload result:", coverImage);
        } catch (error) {
            console.error("Error uploading cover image to Cloudinary:", error);
            throw new ApiError(500, "Failed to upload cover image to Cloudinary");
        }
    }

    // Create user
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    });

    // Select the fields to return
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
