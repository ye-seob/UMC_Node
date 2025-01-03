//signUp Request Dto
export const bodyToUser = (body) => {
  return {
    email: body.email,
    password: body.password,
    name: body.name,
    age: body.age,
    gender: body.gender,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
    point: body.point,
  };
};
export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
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
export const bodyToUserUpdate = (body) => {
  return {
    name: body.name,
    age: body.age,
    gender: body.gender,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
    point: body.point,
  };
};
