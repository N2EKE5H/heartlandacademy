import asyncHandler from "express-async-handler";
import Career from "../models/careerModel.js";

// @desc    Fetch all Careers
// @route   GET /api/careers
// @access  Public
const getCareer = asyncHandler(async (req, res) => {
  const career = await Career.find({}).sort({ _id: -1 });
  res.json(career);
});

// @desc    Fetch Single Single Career
// @route   GET /api/career/:id
// @access  Public
const getCareerById = asyncHandler(async (req, res) => {
  const singleCareer = await Career.findById(req.params.id);
  if (singleCareer) {
    res.json(singleCareer);
  } else {
    res.status(404);
    throw new Error("Career not found");
  }
});

// @desc    Delete career
// @route   DELETE /api/career/:id
// @access  Private
const deleteCareer = asyncHandler(async (req, res) => {
  const singleCareer = await Career.findById(req.params.id);
  if (singleCareer) {
    await singleCareer.remove();
    res.json({ message: "Career Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("Career not found");
  }
});

// @desc    Create career
// @route   POST /api/career
// @access  Private
const createCareer = asyncHandler(async (req, res) => {
  const {
    title,
    careerCategory,
    noOfVacancy,
    employmentType,
    location,
    offeredSalary,
    applyBefore,
    educationLevel,
    experienceRequired,
    careerSpecs,
    careerDesc,
    note,
  } = req.body;

  const career = await Career.create({
    title,
    careerCategory,
    noOfVacancy,
    employmentType,
    location,
    offeredSalary,
    applyBefore,
    educationLevel,
    experienceRequired,
    careerSpecs,
    careerDesc,
    note,
  });

  if (career) {
    res.status(201).json({
      _id: career._id,
      title: career.title,
      careerCategory: career.careerCategory,
      noOfVacancy: career.noOfVacancy,
      employmentType: career.employmentType,
      location: career.location,
      offeredSalary: career.offeredSalary,
      applyBefore: career.applyBefore,
      educationLevel: career.educationLevel,
      experienceRequired: career.experienceRequired,
      careerSpecs: career.careerSpecs,
      careerDesc: career.careerDesc,
      note: career.note,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Career Data");
  }
});

// @desc    Update Career
// @route   PUT /api/career/:id
// @access  Private
const updateCareer = asyncHandler(async (req, res) => {
  const {
    title,
    careerCategory,
    noOfVacancy,
    employmentType,
    location,
    offeredSalary,
    applyBefore,
    educationLevel,
    experienceRequired,
    careerSpecs,
    careerDesc,
    note,
  } = req.body.career;

  const career = await Career.findById(req.params.id);

  if (career) {
    career.title = title;
    career.careerCategory = careerCategory;
    career.noOfVacancy = noOfVacancy;
    career.employmentType = employmentType;
    career.location = location;
    career.offeredSalary = offeredSalary;
    career.applyBefore = applyBefore;
    career.educationLevel = educationLevel;
    career.experienceRequired = experienceRequired;
    career.careerSpecs = careerSpecs;
    career.careerDesc = careerDesc;
    career.note = note;

    const updatedCareer = await career.save();
    res.json(updatedCareer);
  } else {
    res.status(404);
    throw new Error("Career Not Found");
  }
});

export { getCareer, getCareerById, deleteCareer, createCareer, updateCareer };
