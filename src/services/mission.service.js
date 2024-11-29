import { responseFromMission } from "../dtos/mission.dto.js";
import {
  AlreadyExistError,
  InvalidInputError,
  NotFoundError,
} from "../error.js";
import {
  addMission,
  completeMission,
  getMissionById,
  getUserMission,
  getUserMissionByIds,
  startMission,
} from "../repositories/mission.repository.js";

export const missionAdd = async (data) => {
  const existingMission = await prisma.mission.findFirst({
    where: {
      storeId: data.store_id,
      missionSpec: data.mission_spec,
    },
  });

  if (existingMission) {
    throw new AlreadyExistError("동일 미션이 존재합니다", data.store_id);
  }

  const addMissionId = await addMission({
    store_id: data.store_id,
    reward: data.reward,
    deadline: data.deadline,
    mission_spec: data.mission_spec,
  });

  const mission = await getMissionById(addMissionId);

  return responseFromMission({ mission });
};

export const missionStart = async (data) => {
  const existingMission = await getMissionById(data.mission_id);

  if (!existingMission) {
    throw new NotFoundError("존재하지 않는 미션입니다.", data.mission_id);
  }

  const existingUserMission = await getUserMissionByIds(
    data.mission_id,
    data.user_id
  );

  if (existingUserMission) {
    throw new InvalidInputError(
      "해당 미션은 이미 진행 중입니다",
      existingUserMission
    );
  }
  const startMissionId = await startMission({
    user_id: data.user_id,
    mission_id: data.mission_id,
  });

  const mission = await getUserMission(startMissionId);

  return responseFromMission({ mission });
};

export const missionComplete = async (data) => {
  const existingMission = await getMissionById(data.mission_id);

  if (!existingMission) {
    throw new NotFoundError("존재하지 않는 미션입니다.", data.mission_id);
  }
  const userMission = await getUserMissionByIds(data.mission_id, data.user_id);

  if (userMission.status !== "진행중") {
    throw new InvalidInputError(
      "미션이 진행 중인 상태가 아닙니다.",
      userMission
    );
  }
  await completeMission({ user_id: data.user_id, mission_id: data.mission_id });

  return responseFromMission({ userMission });
};
