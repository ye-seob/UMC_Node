import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import {
  handleListUserMissions,
  handleListUserReviews,
  handleUserSignUp,
} from "./controllers/user.controller.js";
import {
  handleListStoreMissions,
  handleListStoreReviews,
  handleStoreAdd,
} from "./controllers/store.contorller.js";
import { handleReviewAdd } from "./controllers/review.controller.js";
import {
  handleMissionAdd,
  handleMissionComplete,
  handleMissionStart,
} from "./controllers/mission.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

/**
 * 공통 응답을 사용할 수 있는 헬퍼 함수 등록
 */
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/stores", handleStoreAdd);
app.post("/api/v1/reviews", handleReviewAdd);
app.post("/api/v1/stores/:storeId/missions", handleMissionAdd);
app.post("/api/v1/users/missions/start", handleMissionStart);
app.post("/api/v1/users/missions/complete", handleMissionComplete);
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions);
app.get("/api/v1/users/:userId/reviews", handleListUserReviews);
app.get("/api/v1/users/:userId/missions", handleListUserMissions);

/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
