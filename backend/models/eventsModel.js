import mongoose from "mongoose";

const eventsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Please add a title"],
    maxlength: 50,
  },
  description: {
    type: String,
    required: [true, "Please add description"],
    maxlength: 1000,
  },
  date: {
    type: Date,
    min: Date.now(),
    required: true,
  },
  isOutdated: {
    type: Boolean,
    required: true,
    default: false,
  },
  image: {
    type: String,
  },
});

const Events = mongoose.model("Events", eventsSchema);

export default Events;
