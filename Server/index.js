import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"
// import gardenRoutes from "./routes/gardenRoutes.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://solveagripak-demo.netlify.app'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.set('trust proxy', 1);

app.use(cookieParser());

//MongoDB connection

mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://spoiledwit:IamSolveagripak000@cluster0.cjsz8dj.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDB connected");
});

db.on("error", (error) => {
  console.log(error);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

const server = app.listen(process.env.PORT || 4000, () => {
  console.log("Server started on port 4000");
});

//Server routes

app.get("/", (req, res) => {
  res.send("This is probably not the page you're looking for!");
});

app.use("/user", userRoutes); 
app.use("/products", productRoutes);
app.use("/projects", projectRoutes);
app.use("/newsletter", newsletterRoutes);
app.use("/contact", contactRoutes);
// app.use("/garden", gardenRoutes);