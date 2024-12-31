import express from "express";
import { handleAddReview } from "../controllers/review.controller.js";

const router = express.Router();
router.post("/", handleAddReview);
export default router;
