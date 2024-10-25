import {getProjects, createProject, getProject, deleteProject, updateProject} from "../controllers/project.js"
import express from "express";
const router = express.Router();

router.get("/", getProjects)
router.post("/", createProject)
router.get("/:id", getProject)
router.delete("/:id", deleteProject)
router.patch("/:id", updateProject)

export default router;