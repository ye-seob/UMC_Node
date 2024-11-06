//signUp Request Dto
export const bodyToUser = (body) => {
  const birth = new Date(body.birth);

  return {
    email: body.email,
    password: body.password,
    name: body.name,
    gender: body.gender,
    birth: birth,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
  };
};
export const responseFromUser = (user, preferences) => {
  return {
    user,
    preferences,
  };
};
