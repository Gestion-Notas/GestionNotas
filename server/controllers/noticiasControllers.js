const multer = require("multer");
const today = new Date().toISOString().substring(0, 10);
const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images");
  },
  filename: (req, file, callback) => {
    callback(null, today+ "-" + file.originalname.replace(/\s/g, ""));
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
  fileFilter: isImage,
});

exports.uploadImage = upload.single("ImagenIDISFT");

exports.upload = (req, res) => {
  console.log(req.file);
  res.status(200).json({
    success: "Success",
  });
};
