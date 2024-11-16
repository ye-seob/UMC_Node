import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { reviewAdd } from "../services/review.service.js";

export const handleReviewAdd = async (req, res, next) => {
  try {
    console.log("리뷰 추가를 요청했습니다!");

    const review = await reviewAdd(bodyToReview(req.body));
    res.status(StatusCodes.OK).success(review);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};
