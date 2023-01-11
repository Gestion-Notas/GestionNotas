const multer = require("multer");

const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only images allowed"));
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter: isImage
});

exports.uploadImage = upload.single("ImagenIDISFT");

exports.upload = (req, res) => {
  console.log(req.file);
  res.status(200).json({
    success: "Success",
  });
};
