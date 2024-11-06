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
export const getMission = async (addMissionId) => {
  const mission = await prisma.mission.findFirst(addMissionId);

  console.log(mission);

  return mission;
};

export const startMission = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [existingMission] = await pool.query(
      `SELECT * FROM mission WHERE id = ?;`,
      [data.mission_id]
    );
    if (!existingMission) {
      throw new Error("존재하지 않는 미션입니다.");
    }

    const [result] = await pool.query(
      `INSERT INTO member_mission (member_id,mission_id,status,created_at,updated_at ) VALUES (?, ?,'진행중' , NOW(), NOW())`,
      [data.member_id, data.mission_id]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
