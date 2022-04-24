import mongoose from "mongoose";

const careerSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add career title"],
      maxlength: [500, "Name can not be more than 500 characters"],
    },
    careerCategory: {
      type: String,
      required: [true, "Please add Career Category"],
      maxlength: [500, "Category can not be more than 500 characters"],
    },

    noOfVacancy: {
      type: Number,
      required: true,
    },
    employmentType: {
      type: String,
      required: [true, "Please add Employment Type"],
      maxlength: [50, "Employment Type must be at least 50 characters"],
    },
    location: {
      type: String,
      required: true,
      maxlength: [500, "Location Name must be at least 500 characters"],
    },
    offeredSalary: {
      type: String,
      required: true,
      maxlength: [500, "Offered Salary must be at least 500 characters"],
    },
    applyBefore: {
      type: Date,
      min: Date.now(),
      required: true,
    },
    educationLevel: {
      type: String,
      required: true,
      maxlength: [500, "Education Level must be at least 500 characters"],
    },
    experienceRequired: {
      type: String,
      required: true,
      maxlength: [500, "Experience Required must be at least 500 characters"],
    },
    careerSpecs: {
      type: String,
      required: [true, "Please add Career Specifications"],
      maxlength: [
        10000,
        "Career Description can not be more than 10000 characters",
      ],
    },
    careerDesc: {
      type: String,
      required: [true, "Please add Career Description"],
      maxlength: [
        10000,
        "Career Description can not be more than 10000 characters",
      ],
    },
    note: {
      type: String,
      maxlength: [10000, "Notes can not be more than 10000 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const Career = mongoose.model("Career", careerSchema);

export default Career;
