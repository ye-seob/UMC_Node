import { responseFromReviews, responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getAllUserReviews,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    age: data.age,
    gender: data.gender,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
    point: data.point,
  });
  console.log(joinUserId);
  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};
export const listUserReviews = async (userId, cursor) => {
  const reviews = await getAllUserReviews(userId, cursor);
  return responseFromReviews(reviews);
};
