import { pool } from "../db.config.js";

// 가게 데이터 삽입
export const addStore = async (data) => {
  const conn = await pool.getConnection();

  const [confirm] = await pool.query(
    `SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExistStore;`,
    data.region_id
  );

  if (!confirm[0].isExistStore) {
    return null;
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO store (region_id, name, address, score, created_at, updated_at) 
VALUES (?, ?, ?, 0, NOW(), NOW());`,
      [data.region_id, data.name, data.address, data.score]
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

// 가게 정보 얻기
export const getStore = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [store] = await pool.query(
      `SELECT * FROM store WHERE id = ?;`,
      storeId
    );

    console.log(store);

    if (store.length == 0) {
      return null;
    }

    return store;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
