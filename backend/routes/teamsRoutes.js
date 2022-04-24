import express from "express";
import path from "path";
import multer from "multer";

import { protect } from "../middleware/authMiddleware.js";
import {
  createTeams,
  deleteTeams,
  getTeams,
} from "../controllers/teamsControllers.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/teams");
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
    return cb(new Error("Only Image files can be uploaded"));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.route("/").get(getTeams).post(protect, createTeams);

router.route("/:id").delete(protect, deleteTeams);

router.post("/uploads", upload.single("formFile"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
