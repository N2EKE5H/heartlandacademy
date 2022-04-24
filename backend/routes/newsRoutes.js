import express from "express";
import path from "path";
import multer from "multer";

import {
  createNews,
  deleteNews,
  getLatestNews,
  getNews,
  getNewsById,
  updateNews,
} from "../controllers/newsControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/newsImages");
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

router.route("/").get(getNews).post(protect, createNews);

router.get("/latest", getLatestNews);
router
  .route("/:id")
  .get(getNewsById)
  .delete(protect, deleteNews)
  .put(protect, updateNews);

router.post("/uploads", upload.single("formFile"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
