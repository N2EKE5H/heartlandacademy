import asyncHandler from "express-async-handler";
import path from "path";
import Teams from "../models/teamsModel.js";

// @desc    Fetch all Teams
// @route   GET /api/teams
// @access  Public
const getTeams = asyncHandler(async (req, res) => {
  const teams = await Teams.find({});
  res.json(teams);
});

// @desc    Delete Team
// @route   DELETE /api/teams/:id
// @access  Private
const deleteTeams = asyncHandler(async (req, res) => {
  const singleTeam = await Teams.findById(req.params.id);
  if (singleTeam) {
    await singleTeam.remove();
    res.json({ message: "Team Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("Team not found");
  }
});

// @desc    Create Team
// @route   POST /api/teams
// @access  Private
const createTeams = asyncHandler(async (req, res) => {
  const { fullName, desc, image } = req.body;

  const team = await Teams.create({
    fullName,
    desc,
    image,
  });

  if (team) {
    res.status(201).json({
      _id: team._id,
      fullName: team.fullName,
      desc: team.desc,
      image: team.image,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Team Data");
  }
});

export { getTeams, deleteTeams, createTeams };
