import { prisma } from "../db.config.js";
import { getStore } from "../repositories/store.repository.js";

export const addReview = async (data) => {
  const store = await getStore(data.store_id);
  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  const review = await prisma.review.findFirst({
    where: { userId: data.user_id, storeId: data.store_id },
  });
  if (review) {
    throw new Error("이미 리뷰를 작성하셨습니다");
  }

  const created = await prisma.review.create({
    data: {
      userId: data.user_id,
      storeId: data.store_id,
      body: data.body,
      score: data.score,
    },
  });
  return created.id;
};

export const getReview = async (addReviewId) => {
  const review = await prisma.review.findFirst({ where: { id: addReviewId } });

  return review;
};
