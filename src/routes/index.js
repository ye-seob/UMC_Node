import express from "express";
import userRouter from "./user.route.js";
import missionRouter from "./mission.route.js";
import storeRouter from "./store.route.js";
import reviewRouter from "./review.route.js";
const router = express.Router();

router.use("/users", userRouter);
router.use("/store", storeRouter);
router.use("/missions", missionRouter);
router.use("/reviews", reviewRouter);

export default router;
