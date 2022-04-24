import mongoose from "mongoose";

const modalSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Please add image"],
    },
  },
  {
    timestamps: true,
  }
);

const Modal = mongoose.model("Modal", modalSchema);

export default Modal;
