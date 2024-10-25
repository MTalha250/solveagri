import express from "express";
import {login, register, getUser,getUsers, getUsersCount, deleteUser} from "../controllers/user.js"
import verifyToken from "../middlewares/verifyToken.js";

const Router = express.Router();

Router.post("/login", login);
Router.post("/register", register);
Router.get("/", verifyToken, getUser);
Router.get("/count/all", getUsersCount);
Router.get("/all", getUsers);
Router.delete("/:id", deleteUser);

export default Router;