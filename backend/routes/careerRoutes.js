import express from "express";
import nodemailer from "nodemailer";
import path from "path";
import multer from "multer";

import { protect } from "../middleware/authMiddleware.js";
import {
  createCareer,
  deleteCareer,
  getCareer,
  getCareerById,
  updateCareer,
} from "../controllers/careerControllers.js";
import Career from "../models/careerModel.js";

const __dirname = path.resolve();
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // cb(null, "uploads/careers");
    cb(null, path.join("uploads/careers"));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error("Please add valid file"));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "heartlandacademy123@gmail.com",
    pass: "lmghyidhkkqhcbnn",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.route("/").get(getCareer).post(protect, createCareer);

router
  .route("/:id")
  .get(getCareerById)
  .delete(protect, deleteCareer)
  .put(protect, updateCareer);

router.post("/uploads", upload.single("formFile"), (req, res) => {
  res.send(`/${req.file.path}`);
});

router.post("/send", function (req, res) {
  try {
    const message = `
      <h2 style='color:blue;'>Contact Details</h2>

      <div>
        <h2>New Career Registration</h2>
      </div>

      <h3>Applied For: ${req.body.careerData.careerTitle}</h3>
      <h3>Name: ${req.body.careerData.fullName}</h3>
      <h3>Phone Number: ${req.body.careerData.phoneNumber}</h3>
      <h3>Email: ${req.body.careerData.email}</h3>
      <div>
        <h3><span style='border-bottom: 1px solid #111'>Message: </span></h3>
        <p>${req.body.careerData.message}</p>
      </div>
      
    `;

    console.log(__dirname);
    console.log(req.body.careerData.cv);

    var mailOptions = {
      from: "heartlandacademy123@gmail.com",
      to: "heartlandacademy123@gmail.com",
      subject: `Career Alert for ${req.body.careerData.careerTitle}!!!`,
      html: message,
      attachments: [
        {
          filename: `${req.body.careerData.originalFile}`,
          contentType: "application/pdf",
          path: path.join(__dirname, `${req.body.careerData.cv}`),
        },
      ],
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log(err);
        res.json({
          status: "fail",
        });
      } else {
        res.json({
          status: "success",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
