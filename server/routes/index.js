const express = require("express");
const { uploadImage, upload } = require("../controllers/noticiasControllers")
const router = express.Router();

router.post('/uploadImage', uploadImage, upload)

module.exports = router;