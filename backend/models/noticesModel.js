import mongoose from "mongoose";

const noticesSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    maxlength: 50,
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: 10000,
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, "Please add valid date"],
  },
  originalFile: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});

const Notices = mongoose.model("Notices", noticesSchema);

export default Notices;
