import { responseFromMission } from "../dtos/mission.dto.js";
import { addMission, getMission } from "../repositories/mission.repository.js";

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
