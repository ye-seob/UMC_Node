import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import {
  listUserMissions,
  listUserReviews,
  userSignUp,
} from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");

  try {
    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.OK).success(user);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};
export const handleListUserReviews = async (req, res, next) => {
  console.log("유저 리뷰 목록 조회를 요청하였습니다.");
  try {
    const reviews = await listUserReviews(
      parseInt(req.params.userId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};
export const handleListUserMissions = async (req, res, next) => {
  console.log("유저 미션 목록 조회를 요청하였습니다.");
  try {
    const missions = await listUserMissions(
      parseInt(req.params.userId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(missions);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};
