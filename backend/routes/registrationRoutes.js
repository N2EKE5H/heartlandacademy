import express from "express";
import path from "path";
import multer from "multer";

import {
  createRegistrations,
  getRegistrations,
  getRegistrationById,
  deleteRegistration,
} from "../controllers/registrationControllers.js";

import { protect } from "../middleware/authMiddleware.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === "marksheet") {
      cb(null, "uploads/registrations/marksheets");
    } else if (file.fieldname === "characterCf") {
      cb(null, "uploads/registrations/characterCf");
    } else if (file.fieldname === "ppphoto") {
      cb(null, "uploads/registrations/ppPhoto");
    } else if (file.fieldname === "application") {
      cb(null, "uploads/registrations/application");
    }
  },
  filename(req, file, cb) {
    if (file.fieldname === "marksheet") {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    } else if (file.fieldname === "characterCf") {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    } else if (file.fieldname === "ppphoto") {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    } else if (file.fieldname === "application") {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    }
  },
});

function checkFileType(file, cb) {
  if (file.fieldname === "marksheet") {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword"
    ) {
      // check file type to be pdf, doc, or docx
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  } else if (file.fieldname === "characterCf") {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      // check file type to be pdf, png, jpeg, or jpg
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  } else if (file.fieldname === "ppphoto") {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      // check file type to be png, jpeg, or jpg
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  } else if (file.fieldname === "application") {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype === "application/docx"
    ) {
      // check file type to be pdf
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  }
}

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).fields([
  {
    name: "marksheet",
    maxCount: 1,
  },
  {
    name: "characterCf",
    maxCount: 1,
  },
  {
    name: "ppphoto",
    maxCount: 1,
  },
  {
    name: "application",
    maxCount: 1,
  },
]);

router.route("/").get(protect, getRegistrations).post(createRegistrations);

router
  .route("/:id")
  .get(protect, getRegistrationById)
  .delete(protect, deleteRegistration);

router.post("/uploads/marksheet", (req, res) => {
  // const marksheetFile = req.files.marksheet[0];
  // res.send(marksheetFile.path);
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("1" + err);
    } else if (err) {
      console.log("2" + err);
    }
    const marksheetFile = req.files.marksheet[0];
    res.send(marksheetFile.path);
  });
});

router.post("/uploads/characterCf", upload, (req, res) => {
  const characterCfFile = req.files.characterCf;
  res.send(characterCfFile[0].path);
});

router.post("/uploads/ppphoto", upload, (req, res) => {
  const ppphotoFile = req.files.ppphoto;
  res.send(ppphotoFile[0].path);
});

router.post(
  "/uploads/application",
  upload,
  asyncHandler(async (req, res) => {
    const applicationFile = req.files.application;
    res.send(applicationFile[0].path);
  })
);

export default router;
