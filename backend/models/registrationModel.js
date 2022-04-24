import mongoose from "mongoose";

const registrationSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name field cannot be empty"],
      maxlength: 30,
    },
    lastName: {
      type: String,
      required: [true, "Last Name field cannot be empty"],
      maxlength: 30,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email address is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phone: {
      type: String,
      trim: true,
      required: true,
      match: [
        /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        "Please provide valid phone number",
      ],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    preference: {
      type: String,
      enum: [
        "Preschool",
        "Primary",
        "Lower Secondary",
        "Junior Higher Secondary",
        "Senior Higher Secondary",
      ],
    },
    lvl: {
      type: String,
      required: function () {
        return true ? this.preference !== "Senior Higher Secondary" : false;
      },
    },
    faculty: {
      type: String,
      required: function () {
        return true ? this.preference === "Senior Higher Secondary" : false;
      },
    },
    markSheet: {
      type: String,
      required: true,
    },
    ppPhoto: {
      type: String,
      required: true,
    },
    characterCerf: {
      type: String,
      required: function () {
        return true ? this.preference === "Senior Higher Secondary" : false;
      },
    },
    application: {
      type: String,
      maxlength: [5000, "Application letter must be at least 5000 characters"],
    },
    attachApplication: {
      type: String,
      required: function () {
        return true ? this.application === "" : false;
      },
    },
  },
  {
    timestamps: true,
  }
);

registrationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 36000 });

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;
