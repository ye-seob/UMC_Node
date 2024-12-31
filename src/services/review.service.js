import { responseFromReview } from "../dtos/review.dto.js";
import { AlreadyExistError, NotFoundError } from "../error.js";
import { addReview, getReview } from "../repositories/review.repository.js";
import { getStoreById } from "../repositories/store.repository.js";

export const reviewAdd = async (data) => {
  const store = await getStoreById(data.store_id);

  if (!store) {
    throw new NotFoundError("존재하지 않는 가게입니다.", data.store_id);
  }
  const existingReview = await prisma.review.findFirst({
    where: { userId: data.user_id, storeId: data.store_id },
  });

  if (existingReview) {
    throw new AlreadyExistError("이미 리뷰를 작성하셨습니다", existingReview);
  }

  const addReviewId = await addReview({
    user_id: data.user_id,
    store_id: data.store_id,
    body: data.body,
    score: data.score,
  });

  const review = await getReview(addReviewId);

  return responseFromReview({ review });
};
