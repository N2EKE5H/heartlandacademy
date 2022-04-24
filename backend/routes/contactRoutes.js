import express from "express";
import nodemailer from "nodemailer";
import path from "path";

const __dirname = path.resolve();
const router = express.Router();

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

router.post("/send", function (req, res) {
  const message = `
    <div style='background-color:powderblue;height:100vh;'>
      <div style='background-color:white;width: 60%;margin:0 auto;padding:10px 5px 30px 5px;'>
      <div style='border-bottom:1px solid #b5aac6; text-align:center;'>
        <img height="100px" width="100px" src="cid:logo">
        </div>  
      <h2 style='color:#b961ff;text-align:center;'>Contact Details</h2>
        <h3 style='text-align:center;'>From: ${req.body.mailerState.name}</h3>
        <div style='margin-left:20px;'> 
          <h4>Email: ${req.body.mailerState.email}</h4>
          <h4>Subject: ${req.body.mailerState.subject}</h4>
        </div>
        <h3 style='margin-left:20px;'>Message: </h3>
        <p style='font-weight:bold;border:1px solid #b5aac6;margin:15px;padding:8px;'>${req.body.mailerState.message}</p>
        </div>
    </div>
  `;
  var mailOptions = {
    from: "heartlandacademy123@gmail.com",
    to: "heartlandacademy123@gmail.com",
    subject: `Contact Request from ${req.body.mailerState.name}`,
    html: message,
    attachments: [
      {
        filename: "Logo.png",
        path: __dirname + "/frontend/public/Logo.png",
        cid: "logo",
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
});

export default router;
