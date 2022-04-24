import mongoose from "mongoose";

const staffsSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: [true, "Please add full name"],
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email address",
    ],
  },
  position: {
    type: String,
    required: [true, "Please add position"],
    maxlength: [1000, "Position field can not be more than 1000 characters"],
  },
  phone: {
    type: String,
    required: [true, "Please add phone number"],
    match: [
      /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      "Please provide valid phone number",
    ],
  },
});

const Staffs = mongoose.model("Staffs", staffsSchema);

export default Staffs;
