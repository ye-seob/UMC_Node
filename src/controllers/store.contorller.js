import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import {
  listStoreMissions,
  listStoreReviews,
  storeAdd,
} from "../services/store.service.js";

export const handleStoreAdd = async (req, res, next) => {
  try {
    console.log("가게 추가를 요청했습니다!");

    const store = await storeAdd(bodyToStore(req.body));
    res.status(StatusCodes.OK).success(store);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};
export const handleListStoreReviews = async (req, res, next) => {
  console.log("가게 리뷰 목록 조회를 요청하였습니다");
  try {
    const reviews = await listStoreReviews(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};

export const handleListStoreMissions = async (req, res, next) => {
  console.log("가게 미션 목록 조회를 요청하였습니다");
  try {
    const missions = await listStoreMissions(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(missions);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};
