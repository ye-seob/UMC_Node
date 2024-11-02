import { pool } from "../db.config.js";

export const addReview = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [existingReviews] = await pool.query(
      `SELECT * FROM review WHERE member_id = ? AND store_id = ?;`,
      [data.member_id, data.store_id]
    );
    if (existingReviews.length > 0) {
      throw new Error("이미 이 가게에 리뷰를 작성하셨습니다.");
    }

    const [result] = await pool.query(
      `INSERT INTO review (member_id,store_id,body,score,created_at) VALUES (?, ?, ?,?, NOW());`,
      [data.member_id, data.store_id, data.body, data.score]
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
export const getReview = async (addReviewId) => {
  const conn = await pool.getConnection();

  try {
    const [review] = await pool.query(
      `SELECT * FROM review WHERE id = ?;`,
      addReviewId
    );

    console.log(review);

    if (review.length == 0) {
      return null;
    }

    return review;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
