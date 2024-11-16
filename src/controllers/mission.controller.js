import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToUser_mission } from "../dtos/mission.dto.js";
import {
  missionAdd,
  missionComplete,
  missionStart,
} from "../services/mission.service.js";

export const handleMissionAdd = async (req, res, next) => {
  console.log("가게에 미션 추가를 요청했습니다!");

  try {
    const storeId = parseInt(req.params.storeId, 10);
    const mission = await missionAdd(bodyToMission(req.body, storeId));

    res.status(StatusCodes.OK).success(mission);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};

export const handleMissionStart = async (req, res, next) => {
  console.log("미션 진행을 요청했습니다!");
  try {
    const mission = await missionStart(bodyToUser_mission(req.body));
    res.status(StatusCodes.OK).success(mission);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};

export const handleMissionComplete = async (req, res, next) => {
  try {
    console.log("미션 완료를 요청했습니다!");

    const mission = await missionComplete(bodyToUser_mission(req.body));
    res.status(StatusCodes.OK).success(mission);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};
