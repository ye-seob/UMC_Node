import { pool } from "../db.config.js";

export const addMission = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [existingStore] = await pool.query(
      `SELECT * FROM store WHERE id = ?;`,
      [data.store_id]
    );
    if (!existingStore) {
      throw new Error("존재하지 않는 가게입니다.");
    }

    const [result] = await pool.query(
      `INSERT INTO mission (store_id,reward,deadline ,mission_spec ,created_at ,updated_at ) VALUES (?, ?, ?,?, NOW(), NOW());`,
      [data.store_id, data.reward, data.deadline, data.mission_spec]
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
export const getMission = async (addMissionId) => {
  const conn = await pool.getConnection();

  try {
    const [mission] = await pool.query(
      `SELECT * FROM mission WHERE id = ?;`,
      addMissionId
    );

    console.log(mission);

    if (mission.length == 0) {
      return null;
    }

    return mission;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
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
