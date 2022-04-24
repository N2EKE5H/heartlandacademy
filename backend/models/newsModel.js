import mongoose from "mongoose";

const newsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please add description"],
      maxlength: [5000, "Description can not be more than 5000 characters"],
    },
    section: {
      type: String,
      enum: [
        "Preschool",
        "Primary",
        "Lower Secondary",
        "Junior Higher Secondary",
        "Senior Higher Secondary",
      ],
      // Preschool = Nurser-Kindergarten
      // Primary = 1-5
      // Lower Secondary = 6-8
      // Junior Higher Secondary = 9-10
      // Senior Higher Secondary = 11-12
    },
    image: {
      type: String,
      required: true,
    },
    claps: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newsSchema);

export default News;
