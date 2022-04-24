import express from "express";
import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import cors from "cors";

import newsRoutes from "./routes/newsRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import carouselRoutes from "./routes/carouselRoutes.js";
import modalRoutes from "./routes/modalRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import staffsRoutes from "./routes/staffsRoutes.js";
import noticesRoutes from "./routes/noticesRoutes.js";
import teamsRoutes from "./routes/teamsRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import testimonialsRoutes from "./routes/testimonialsRoutes.js";
import fileDownloadRoutes from "./routes/fileDownloadRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/carousel", carouselRoutes);
app.use("/api/modal", modalRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/staffs", staffsRoutes);
app.use("/api/notices", noticesRoutes);
app.use("/api/downloads", fileDownloadRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/teams", teamsRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/contact", contactRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}
app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold
  )
);
