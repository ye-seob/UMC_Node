export const bodyToReview = (body) => {
  return {
    user_id: body.user_id,
    store_id: body.store_id,
    body: body.body,
    score: body.score,
  };
};
export const responseFromReview = (review) => {
  return {
    review,
  };
};
