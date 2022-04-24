import mongoose from "mongoose";

const videoSchema = mongoose.Schema(
  {
    src: {
      type: String,
      required: [true, "Please add valid video src"],
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;
