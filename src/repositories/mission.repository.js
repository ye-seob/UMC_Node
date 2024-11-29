import { prisma } from "../db.config.js";
import { GenericUserError, NotFoundError } from "../error.js";
import { getStoreById } from "./store.repository.js";

export const addMission = async (data) => {
  const created = await prisma.mission.create({
    data: {
      storeId: data.store_id,
      reward: data.reward,
      deadline: data.deadline,
      missionSpec: data.mission_spec,
    },
  });
  return created.id;
};
export const getMissionById = async (MissionId) => {
  const mission = await prisma.mission.findFirst({
    where: {
      id: MissionId,
    },
  });

  return mission;
};

export const getUserMission = async (missionId) => {
  const mission = await prisma.userMission.findFirst({
    where: {
      id: missionId,
    },
  });

  return mission;
};
export const getUserMissionByIds = async (missionId, userId) => {
  const mission = await prisma.userMission.findFirst({
    where: {
      userId: userId,
      missionId: missionId,
    },
  });

  return mission;
};

export const startMission = async (data) => {
  const created = await prisma.userMission.create({
    data: {
      userId: data.user_id,
      missionId: data.mission_id,
      status: "진행중",
    },
  });

  return created.id;
};

export const completeMission = async (data) => {
  const updated = await prisma.userMission.update({
    where: {
      id: userMission.id,
    },
    data: {
      status: "완료",
    },
  });
};
