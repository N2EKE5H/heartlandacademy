import FileDownload from "../models/downloadsModel.js";
import asyncHandler from "express-async-handler";
import path from "path";
const __dirname = path.resolve();

// @desc    FETCH all available downloads
// @route   GET /api/downloads
// @access  Public
const getDownloads = asyncHandler(async (req, res) => {
  const downloads = await FileDownload.find({}).sort({ _id: -1 });
  res.json(downloads);
});

// @desc    Create Download
// @route   POST /api/downloads
// @access  Public
const createDownload = asyncHandler(async (req, res) => {
  const { title, originalFile, file } = req.body;

  const download = await FileDownload.create({
    title,
    originalFile,
    file,
  });
  if (download) {
    res.status(201).json({
      _id: download._id,
      title: download.title,
      originalFile: download.originalFile,
      file: download.file,
    });
  } else {
    res.status(400);
    throw new Error("Invalid name or file");
  }
});

// @desc    Delete Downloads
// @route   DELETE /api/downloads/:id
// @access  Private
const deleteDownloads = asyncHandler(async (req, res) => {
  const singleDownload = await FileDownload.findById(req.params.id);
  if (singleDownload) {
    await singleDownload.remove();
    res.json({ message: "File Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("File not found");
  }
});

// @desc    Create File Download
// @route   POST /api/downloads/:id/download
// @access  Private
const downloadFile = asyncHandler(async (req, res) => {
  FileDownload.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var path = __dirname + data[0].file;
      res.download(path);
    }
  });
});

export { getDownloads, createDownload, deleteDownloads, downloadFile };
