import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { missionAdd } from "../services/mission.service.js";

export const handleMissionAdd = async (req, res, next) => {
  console.log("가게에 미션 추가를 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
  const storeId = req.params.storeId;
  const mission = await missionAdd(bodyToMission(req.body, storeId));
  res.status(StatusCodes.OK).json({ result: mission });
};
