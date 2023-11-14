import multer from "multer";

//Multer Setup

//DiskStorage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1000000) +
        "-" +
        file.originalname
    );
  },
  destination: (req, file, cb) => {
    if (file.fieldname === "userPhoto") {
      cb(null, "public/user");
    }
  },
});

// Multer Middleware

export const userMulter = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type"));
      } 
  },
}).single("userPhoto");
