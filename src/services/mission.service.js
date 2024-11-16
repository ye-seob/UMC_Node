import { responseFromMission } from "../dtos/mission.dto.js";
import {
  addMission,
  completeMission,
  getMission,
  startMission,
} from "../repositories/mission.repository.js";

export const missionAdd = async (data) => {
  const addMissionId = await addMission({
    store_id: data.store_id,
    reward: data.reward,
    deadline: data.deadline,
    mission_spec: data.mission_spec,
  });

  const mission = await getMission(addMissionId);

  return responseFromMission({ mission });
};

export const missionStart = async (data) => {
  const startMissionId = await startMission({
    user_id: data.user_id,
    mission_id: data.mission_id,
  });

  const mission = await getMission(startMissionId);

  return responseFromMission({ mission });
};

export const missionComplete = async (data) => {
  const completeMissionId = await completeMission({
    user_id: data.user_id,
    mission_id: data.mission_id,
  });

  const mission = await getMission(completeMissionId);

  return responseFromMission({ mission });
};
