import express from "express";
import path from "path";
import multer from "multer";
import { protect } from "../middleware/authMiddleware.js";
import {
  createAlbum,
  createVideos,
  deleteAlbum,
  deleteVideos,
  getAlbum,
  getAlbums,
  getVideos,
} from "../controllers/galleryControllers.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/gallery");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error("Please add valid image file"));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.route("/albums").get(getAlbums).post(protect, createAlbum);
router.route("/videos").get(getVideos).post(protect, createVideos);
router.route("/albums/:id").get(getAlbum).delete(protect, deleteAlbum);
router.route("/videos/:id").delete(protect, deleteVideos);

router.post("/uploads", upload.array("images"), (req, res, next) => {
  const reqFiles = [];
  // const url = req.protocol + "://" + req.get("host");
  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push("/uploads/gallery/" + req.files[i].filename);
  }
  // for (var i = 0; i < req.files.length; i++) {
  //   reqFiles.push("/" + req.files[i].path);
  // }
  console.log("Hello" + reqFiles);
  res.send(reqFiles);
});

export default router;
