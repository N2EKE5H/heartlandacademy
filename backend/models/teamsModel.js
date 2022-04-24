import mongoose from "mongoose";

const teamsSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: [true, "Please add full name"],
    maxlength: 100,
  },
  desc: {
    type: String,
    required: [true, "Please add description"],
    maxlength: 1000,
  },
});

const Teams = mongoose.model("Teams", teamsSchema);

export default Teams;
