import jwr from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const verifyToken = (req, res, next) => {
  //Check Cookies
  const { accessToken } = req.cookies;

  //Check Authorization Token
  if (!accessToken) {
    return res.status(401).json({ message: "UNAuthorization " });
  }

  // Verify Access Token
  jwr.verify(
    accessToken,
    process.env.JWT_SCERET,
    asyncHandler(async (error, decode) => {
      if (error) {
        return res.status(404).json({ message: "Invalid token" });
      }
      next();
    })
  );
  
};
