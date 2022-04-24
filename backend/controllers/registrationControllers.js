import asyncHandler from "express-async-handler";
import Registration from "../models/registrationModel.js";
import axios from "axios";

// @desc    Fetch all Registrations
// @route   GET /api/registration
// @access  Private
const getRegistrations = asyncHandler(async (req, res) => {
  const registration = await Registration.find({}).sort({ _id: -1 });
  res.json(registration);
});

// @desc    Fetch Single Registration
// @route   GET /api/registration/:id
// @access  Private
const getRegistrationById = asyncHandler(async (req, res) => {
  const singleRegistration = await Registration.findById(req.params.id);
  if (singleRegistration) {
    res.json(singleRegistration);
  } else {
    res.status(404);
    throw new Error("Registration not found");
  }
});

// @desc    Delete Registration
// @route   DELETE /api/registration/:id
// @access  Private
const deleteRegistration = asyncHandler(async (req, res) => {
  const singleRegistration = await Registration.findById(req.params.id);
  if (singleRegistration) {
    await singleRegistration.remove();
    res.json({ message: "Registration Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("Registration not found");
  }
});

// @desc    Create Registration
// @route   POST /api/registration
// @access  Public
const createRegistrations = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    preference,
    lvl,
    faculty,
    markSheet,
    ppPhoto,
    characterCerf,
    application,
    attachApplication,
    token,
  } = req.body;

  const secret = "6Lc8c4ceAAAAAIg0rLnYcxaFUsI9G4UDffpFByyZ";

  const res1 = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
  );

  const registration = await Registration.create({
    firstName,
    lastName,
    email,
    phone,
    address,
    preference,
    lvl,
    faculty,
    markSheet,
    ppPhoto,
    characterCerf,
    application,
    attachApplication,
  });

  if (registration) {
    res.status(201).json({
      _id: registration._id,
      firstName: registration.firstName,
      lastName: registration.lastName,
      email: registration.email,
      phone: registration.phone,
      address: registration.address,
      preference: registration.preference,
      lvl: registration.preference,
      faculty: registration.faculty,
      markSheet: registration.markSheet,
      ppPhoto: registration.ppPhoto,
      characterCerf: registration.characterCerf,
      application: registration.application,
      attachApplication: registration.attachApplication,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Registration Data");
  }
});

export {
  getRegistrations,
  getRegistrationById,
  deleteRegistration,
  createRegistrations,
};
