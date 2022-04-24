import asyncHandler from "express-async-handler";
import News from "../models/newsModel.js";

// @desc    Fetch all News
// @route   GET /api/news
// @access  Public
const getNews = asyncHandler(async (req, res) => {
  const news = await News.find({}).sort({ _id: -1 });
  res.json(news);
});

// @desc    Fetch Single News
// @route   GET /api/news/:id
// @access  Public
const getNewsById = asyncHandler(async (req, res) => {
  const singleNews = await News.findById(req.params.id);
  if (singleNews) {
    res.json(singleNews);
  } else {
    res.status(404);
    throw new Error("News not found");
  }
});

// @desc    Delete news
// @route   DELETE /api/news/:id
// @access  Private
const deleteNews = asyncHandler(async (req, res) => {
  const singleNews = await News.findById(req.params.id);
  if (singleNews) {
    await singleNews.remove();
    res.json({ message: "News Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("News not found");
  }
});

// @desc    Create news
// @route   POST /api/news
// @access  Private
const createNews = asyncHandler(async (req, res) => {
  const { title, author, description, section, image, user } = req.body;

  const news = await News.create({
    title,
    user,
    author,
    description,
    section,
    image,
  });

  if (news) {
    res.status(201).json({
      _id: news._id,
      user: user._id,
      title: news.title,
      author: news.author,
      description: news.description,
      section: news.section,
      image: news.image,
    });
  } else {
    res.status(400);
    throw new Error("Invalid News Data");
  }
});

// @desc    Update news
// @route   PUT /api/news/:id
// @access  Private
const updateNews = asyncHandler(async (req, res) => {
  const { title, author, description, section, image } = req.body.news;

  const news = await News.findById(req.params.id);

  if (news) {
    news.title = title;
    news.author = author;
    news.description = description;
    news.section = section;
    news.image = image;

    const updatedNews = await news.save();
    res.json(updatedNews);
  } else {
    res.status(404);
    throw new Error("News Not Found");
  }
});

// @desc    Fetch Latest 5 news
// @route   GET /api/news/latest
// @access  Public
const getLatestNews = asyncHandler(async (req, res) => {
  const news = await News.find({}).sort({ _id: -1 }).limit(4);
  res.json(news);
});

export {
  getNews,
  getNewsById,
  deleteNews,
  createNews,
  updateNews,
  getLatestNews,
};
