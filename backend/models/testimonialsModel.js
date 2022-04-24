import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please add full name"],
    maxlength: 50,
  },
  image: { type: String },
  desc: {
    type: String,
    required: [true, "Please provide description"],
    maxlength: 500,
  },
  message: {
    type: String,
    required: [true, "Please add message"],
    maxlength: 4000,
  },
});

const testimonialsSchema = mongoose.Schema({
  students: [messageSchema],
  visitors: [messageSchema],
});

const Testimonials = mongoose.model("Testimonials", testimonialsSchema);

export default Testimonials;
