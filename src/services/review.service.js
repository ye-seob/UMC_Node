import { responseFromReview } from "../dtos/review.dto.js";
import { addReview, getReview } from "../repositories/review.repository.js";

export const reviewAdd = async (data) => {
  const addReviewId = await addReview({
    store_id: data.store_id,
    reward: data.reward,
    deadline: data.eadline,
    mission_spec: data.mission_spec,
  });

  const review = await getReview(addReviewId);

  return responseFromReview({ review });
};
