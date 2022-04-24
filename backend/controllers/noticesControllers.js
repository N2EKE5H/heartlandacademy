import asyncHandler from "express-async-handler";
import Notices from "../models/noticesModel.js";
import path from "path";

const __dirname = path.resolve();

// @desc    Fetch all Notices
// @route   GET /api/notices
// @access  Public
const getNotices = asyncHandler(async (req, res) => {
  const notices = await Notices.find({}).sort({ _id: -1 });
  res.json(notices);
});

// @desc    Delete Notices
// @route   DELETE /api/notices/:id
// @access  Private
const deleteNotices = asyncHandler(async (req, res) => {
  const singleNotice = await Notices.findById(req.params.id);
  if (singleNotice) {
    await singleNotice.remove();
    res.json({ message: "Notice Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("Notice not found");
  }
});

// @desc    Create Notice
// @route   POST /api/notices
// @access  Private
const createNotices = asyncHandler(async (req, res) => {
  const { title, description, date, file, originalFile } = req.body;

  const notice = await Notices.create({
    title,
    description,
    date,
    file,
    originalFile,
  });

  if (notice) {
    res.status(201).json({
      _id: notice._id,
      title: notice.title,
      description: notice.description,
      date: notice.date,
      originalFile: notice.originalFile,
      file: notice.file,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Notice Data");
  }
});

// @desc    Create Notice Download
// @route   POST /api/notices/:id/download
// @access  Private
const downloadNotice = asyncHandler(async (req, res) => {
  Notices.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var path = __dirname + data[0].file;
      res.download(path);
    }
  });
});

// @desc    Fetch latest 3 notices
// @route   GET /api/notices/latest
// @access  Public
const getLatestNotice = asyncHandler(async (req, res) => {
  const notice = await Notices.find({}).sort({ _id: -1 }).limit(3);
  res.json(notice);
});

export {
  getNotices,
  deleteNotices,
  createNotices,
  downloadNotice,
  getLatestNotice,
};
