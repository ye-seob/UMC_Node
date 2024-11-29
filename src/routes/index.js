import express from "express";
import userRouter from "./user.route.js";
import missionRouter from "./mission.route.js";
import storeRouter from "./store.route.js";
import reviewRouter from "./review.route.js";
import authRouter from "./auth.route.js";
const router = express.Router();

router.use("/users", userRouter);
router.use("/store", storeRouter);
router.use("/missions", missionRouter);
router.use("/reviews", reviewRouter);
router.use("/oauth2/login", authRouter);
export default router;
