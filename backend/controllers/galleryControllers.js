import asyncHandler from "express-async-handler";
import Album from "../models/albumModel.js";
import Video from "../models/videoModel.js";

// @desc    Fetch all Albums
// @route   GET /api/gallery/albums
// @access  Public
const getAlbums = asyncHandler(async (req, res) => {
  const albums = await Album.find({}).sort({ _id: -1 });
  res.json(albums);
});

// @desc    Fetch Album by id
// @route   GET /api/gallery/albums/:id
// @access  Public
const getAlbum = asyncHandler(async (req, res) => {
  const album = await Album.findById(req.params.id);
  if (album) {
    res.json(album);
  } else {
    res.status(404);
    throw new Error("Album Not Found");
  }
});

// @desc    Create Album
// @route   POST /api/gallery/albums
// @access  Private
const createAlbum = asyncHandler(async (req, res) => {
  const { name, images } = req.body;
  console.log(images);
  const album = await Album.create({
    name,
    images,
  });
  console.log(album);
  if (album) {
    res.status(201).json({
      _id: album._id,
      name: album.name,
      images: album.images,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Album Data");
  }
});

// @desc    Delete Album
// @route   DELETE /api/gallery/albums/:id
// @access  Private
const deleteAlbum = asyncHandler(async (req, res) => {
  const album = await Album.findById(req.params.id);
  if (album) {
    await album.remove();
    res.json({ message: "Album Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("Album not found");
  }
});

// @desc    Fetch all Videos
// @route   GET /api/gallery/videos
// @access  Public
const getVideos = asyncHandler(async (req, res) => {
  const videos = await Video.find({}).sort({ _id: -1 });
  res.json(videos);
});

// @desc    Create Videos
// @route   POST /api/gallery/videos
// @access  Private
const createVideos = asyncHandler(async (req, res) => {
  const { src } = req.body;

  const videos = await Video.create({
    src,
  });

  if (videos) {
    res.status(201).json({
      _id: videos._id,
      src: videos.src,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Video URL");
  }
});

// @desc    Delete Video
// @route   DELETE /api/gallery/videos/:id
// @access  Private
const deleteVideos = asyncHandler(async (req, res) => {
  const singleVideo = await Video.findById(req.params.id);
  if (singleVideo) {
    await singleVideo.remove();
    res.json({ message: "Video Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("Video not found");
  }
});

export {
  getAlbums,
  getAlbum,
  createAlbum,
  deleteAlbum,
  getVideos,
  createVideos,
  deleteVideos,
};
