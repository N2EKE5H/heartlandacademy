import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import news from "./data/news.js";
import albums from "./data/albums.js";
import User from "./models/userModel.js";
import News from "./models/newsModel.js";
import Events from "./models/eventsModel.js";
import connectDB from "./config/db.js";
import Album from "./models/albumModel.js";
import Teams from "./models/teamsModel.js";
import Video from "./models/videoModel.js";
import videos from "./data/videos.js";
import events from "./data/events.js";
import carousel from "./data/carousel.js";
import staffs from "./data/staffs.js";
import notices from "./data/notices.js";
import downloads from "./data/downloads.js";
import Staffs from "./models/staffsModel.js";
import Notices from "./models/noticesModel.js";
import FileDownload from "./models/downloadsModel.js";
import Carousel from "./models/carouselModel.js";
import Registration from "./models/registrationModel.js";
import registration from "./data/registration.js";
import Modal from "./models/modalModel.js";
import modal from "./data/modal.js";
import teams from "./data/teams.js";
import career from "./data/careers.js";
import testimonials from "./data/testimonials.js";
import Testimonials from "./models/testimonialsModel.js";
import Career from "./models/careerModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Album.deleteMany();
    await Video.deleteMany();
    await News.deleteMany();
    await Events.deleteMany();
    await Registration.deleteMany();
    await Staffs.deleteMany();
    await Notices.deleteMany();
    await FileDownload.deleteMany();
    await Carousel.deleteMany();
    await Modal.deleteMany();
    await Teams.deleteMany();
    await Testimonials.deleteMany();
    await Career.deleteMany();
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleNews = news.map((n) => {
      return { ...n, user: adminUser };
    });

    const sampleEvents = events.map((e) => {
      return { ...e, user: adminUser };
    });

    await News.insertMany(sampleNews);
    await Events.insertMany(sampleEvents);
    await Staffs.insertMany(staffs);
    await Album.insertMany(albums);
    await Video.insertMany(videos);
    await Notices.insertMany(notices);
    await FileDownload.insertMany(downloads);
    await Carousel.insertMany(carousel);
    await Modal.insertMany(modal);
    await Registration.insertMany(registration);
    await Teams.insertMany(teams);
    await Career.insertMany(career);
    await Testimonials.insertMany(testimonials);

    console.log("Data Imported".blue.bold);
  } catch (error) {
    console.error(`${error.message}`.red.underline);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await News.deleteMany();
    await Events.deleteMany();
    await Registration.deleteMany();
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    console.log("Data Deleted".rainbow.bold);
  } catch (error) {
    console.error(`${error.message}`.red.underline);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
