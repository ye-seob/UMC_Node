import { prisma } from "../db.config.js";
import { getStore } from "./store.repository.js";

export const addMission = async (data) => {
  console.log("data입니다 ", data);
  const store = await getStore(data.store_id);

  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }
  const mission = await prisma.mission.findFirst({
    where: {
      storeId: data.store_id,
      missionSpec: data.mission_spec,
    },
  });

  if (mission) {
    throw new Error("동일 미션이 존재합니다");
  }
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
export const getMission = async (MissionId) => {
  const mission = await prisma.mission.findFirst({
    where: {
      id: MissionId,
    },
  });

  console.log(mission);

  return mission;
};

export const startMission = async (data) => {
  const mission = await getMission(data.mission_id);
  if (!mission) {
    throw new Error("존재하지 않는 미션입니다.");
  }

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
  const mission = await getMission(data.mission_id);
  if (!mission) {
    throw new Error("존재하지 않는 미션입니다.");
  }
  //진행중인 미션인지 먼저 확인
  const userMission = await prisma.userMission.findFirst({
    where: {
      userId: data.user_id,
      missionId: data.mission_id,
    },
  });
  if (userMission.status !== "진행중") {
    throw new Error("미션이 진행 중인 상태가 아닙니다.");
  }

  //추후에 미션을 제대로 완료 했는지 검사해야함

  const updated = await prisma.userMission.update({
    where: {
      id: userMission.id,
    },
    data: {
      status: "완료",
    },
  });

  return updated.id;
};
