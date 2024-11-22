import { responseFromMission } from "../dtos/mission.dto.js";
import { responseFromReviews, responseFromUser } from "../dtos/user.dto.js";
import { GenericUserError, NotFoundError } from "../error.js";
import {
  addUser,
  getAllUserMissions,
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

  if (!joinUserId) {
    throw new GenericUserError("이미 존재하는 이메일입니다.", data.email);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};
export const listUserReviews = async (userId, cursor) => {
  const user = await getUser(userId);

  if (!user) {
    throw new NotFoundError("존재하지 않는 유저입니다", userId);
  }
  const reviews = await getAllUserReviews(userId, cursor);
  return responseFromReviews(reviews);
};
export const listUserMissions = async (userId, cursor) => {
  const user = await getUser(userId);

  if (!user) {
    throw new NotFoundError("존재하지 않는 유저입니다", userId);
  }
  const missions = await getAllUserMissions(userId, cursor);
  return responseFromMission(missions);
};
