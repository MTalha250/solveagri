import express from "express";
import {createNewsletter, deleteNewsletterbyEmail,deleteNewsletterbyId, getNewsletters, getSubscribers} from "../controllers/newsletter.js"
const router = express.Router();

router.post("/", createNewsletter);
router.get("/", getNewsletters);
router.delete("/", deleteNewsletterbyEmail);
router.delete("/:id", deleteNewsletterbyId);
router.get("/count/all", getSubscribers);

export default router;