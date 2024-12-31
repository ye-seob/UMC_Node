//add store Request Dto
export const bodyToStore = (body) => {
  return {
    region_id: body.region_id,
    name: body.name,
    address: body.address || "",
  };
};

export const responseFromStore = (store) => {
  return {
    store,
  };
};
export const responseFromReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};
