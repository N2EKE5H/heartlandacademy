import express from "express";
import path from "path";
import multer from "multer";

import {
  createNotices,
  deleteNotices,
  downloadNotice,
  getLatestNotice,
  getNotices,
} from "../controllers/noticesControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/notices");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error("Only PDF can be uploaded"));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.route("/").get(getNotices).post(protect, createNotices);

router.get("/latest", getLatestNotice);

router.route("/:id").delete(protect, deleteNotices);

router.route("/:id/download").get(downloadNotice);

router.post("/uploads", upload.single("formFile"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
