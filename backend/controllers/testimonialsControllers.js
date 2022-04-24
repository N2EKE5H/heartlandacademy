import asyncHandler from "express-async-handler";
import Testimonials from "../models/testimonialsModel.js";

// @desc    Fetch all Student Testimonials
// @route   GET /api/testimonials/students
// @access  Public
const getStudentsTestimonials = asyncHandler(async (req, res) => {
  const studentsTestimonials = await Testimonials.find(
    {},
    { students: 1 }
  ).select("-_id");
  res.json(studentsTestimonials);
});

// @desc    Create Student Testimonials
// @route   POST /api/testimonials/students
// @access  Private
const createStudentTestimonials = asyncHandler(async (req, res) => {
  const { fullName, image, desc, message } = req.body;

  const studentTestimonialData = { fullName, image, desc, message };

  const studentsTestimonials = await Testimonials.find({}).updateOne({
    $push: {
      students: {
        $each: [studentTestimonialData],
        $position: 0,
      },
    },
  });

  if (studentsTestimonials) {
    res.status(201).json({ message: "Testimonial Added" });
  } else {
    res.json("Testimonial Not Found");
  }

  // if (studentsTestimonials) {

  //   console.log(studentsTestimonials._id);

  //   studentsTestimonials.push(studentTestimonialData);

  //   // await studentsTestimonials.save();

  //   res.status(201).json({ message: "Testimonial Added" });
  // } else {
  //   res.status(404);
  //   throw new Error("Testimonial not Found");
  // }
});

// @desc    Delete Student Testimonial
// @route   DELETE /api/testimonials/students/:id
// @access  Private
const deleteStudentTestimonial = asyncHandler(async (req, res) => {
  console.log("test");
  const studentsTestimonials = await Testimonials.find({}).updateMany({
    $pull: {
      students: { _id: req.params.id },
    },
  });

  console.log("random");
  console.log(studentsTestimonials);

  if (studentsTestimonials) {
    res.status(201).json({ message: "Testimonial Deleted" });
  } else {
    res.json("Testimonial Not Found");
  }
});

// @desc    Fetch all Visitors Testimonials
// @route   GET /api/testimonials/visitors
// @access  Public
const getVisitorsTestimonials = asyncHandler(async (req, res) => {
  const visitorsTestimonials = await Testimonials.find(
    {},
    { visitors: 1 }
  ).select("-_id");
  res.json(visitorsTestimonials);
});

// @desc    Create Visitors Testimonials
// @route   POST /api/testimonials/visitors
// @access  Private
const createVisitorsTestimonials = asyncHandler(async (req, res) => {
  const { fullName, image, desc, message } = req.body;

  const visitorTestimonialData = { fullName, image, desc, message };

  const visitorsTestimonials = await Testimonials.find({}).updateOne({
    $push: {
      visitors: {
        $each: [visitorTestimonialData],
        $position: 0,
      },
    },
  });

  if (visitorsTestimonials) {
    res.status(201).json({ message: "Testimonial Added" });
  } else {
    res.json("Testimonial Not Found");
  }
});

// @desc    Delete Visitor Testimonial
// @route   DELETE /api/testimonials/student/:id
// @access  Private
const deleteVisitorsTestimonials = asyncHandler(async (req, res) => {
  const visitorsTestimonials = await Testimonials.find({}).updateMany({
    $pull: {
      visitors: { _id: req.params.id },
    },
  });

  if (visitorsTestimonials) {
    res.status(201).json({ message: "Testimonial Deleted" });
  } else {
    res.json("Testimonial Not Found");
  }
});

export {
  getStudentsTestimonials,
  getVisitorsTestimonials,
  createStudentTestimonials,
  createVisitorsTestimonials,
  deleteStudentTestimonial,
  deleteVisitorsTestimonials,
};
