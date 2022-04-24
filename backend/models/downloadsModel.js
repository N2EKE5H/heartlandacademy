import mongoose from "mongoose";

const fileDownloadSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      maxlength: 500,
    },
    originalFile: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FileDownload = mongoose.model("FileDownload", fileDownloadSchema);

export default FileDownload;
