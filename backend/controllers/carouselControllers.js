import asyncHandler from "express-async-handler";
import Carousel from "../models/carouselModel.js";

// @desc    Fetch all Carousel
// @route   GET /api/carousel
// @access  Public
const getCarousel = asyncHandler(async (req, res) => {
  const carousel = await Carousel.find({});
  res.json(carousel);
});

// @desc    Delete Carousel
// @route   DELETE /api/carousel/:id
// @access  Private
const deleteCarousel = asyncHandler(async (req, res) => {
  const singleCarousel = await Carousel.findById(req.params.id);
  if (singleCarousel) {
    await singleCarousel.remove();
    res.json({ message: "Carousel Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("Carousel not found");
  }
});

// @desc    Create Carousel
// @route   POST /api/carousel
// @access  Private
const createCarousel = asyncHandler(async (req, res) => {
  const { title, image, description } = req.body;

  const carousel = await Carousel.create({
    title,
    image,
    description,
  });

  if (carousel) {
    res.status(201).json({
      _id: carousel._id,
      title: carousel.title,
      description: carousel.description,
      image: carousel.image,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Carousel Data");
  }
});

export { getCarousel, deleteCarousel, createCarousel };
