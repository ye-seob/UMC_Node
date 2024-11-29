import { prisma } from "../db.config.js";

export const addReview = async (data) => {
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
