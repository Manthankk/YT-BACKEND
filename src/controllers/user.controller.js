import { asyncHandler } from "../utils/asyncHandler.js"; 

const registerUser = asyncHandler(async (req, res) => {
    console.log("POST /register route hit");  // Log to check if the route is reached
    console.log("Request body:", req.body);  // Log the request body for debugging

    res.status(200).json({
        message: "ok"
    });
});

export { registerUser };
