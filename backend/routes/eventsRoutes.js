import express from "express";
import path from "path";
import multer from "multer";

import {
  createEvents,
  deleteEvents,
  getEvents,
  getLatestEvents,
  getUpcomingEvents,
} from "../controllers/eventsControllers.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/eventsImages");
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

router.route("/").get(protect, getEvents).post(protect, createEvents);

router.get("/upcomingevents", getUpcomingEvents);
router.get("/upcoming", getLatestEvents);
router.route("/:id").delete(protect, deleteEvents);

router.post("/uploads", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
