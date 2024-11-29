import express from "express";
import { handleReviewAdd } from "../controllers/review.controller.js";

const router = express.Router();
router.post("/", handleReviewAdd);
export default router;
