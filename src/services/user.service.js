import { responseFromMission } from "../dtos/mission.dto.js";
import { responseFromReviews, responseFromUser } from "../dtos/user.dto.js";
import { AlreadyExistError, NotFoundError } from "../error.js";
import {
  addUser,
  getAllUserMissions,
  getAllUserReviews,
  getUserById,
  getUserPreferencesById,
  setPreference,
  updateUser,
} from "../repositories/user.repository.js";

export const userSignup = async (data) => {
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
    throw new AlreadyExistError("이미 존재하는 이메일입니다.", data.email);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUserById(joinUserId);
  const preferences = await getUserPreferencesById(joinUserId);

  return responseFromUser({ user, preferences });
};
export const listUserReviews = async (userId, cursor) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new NotFoundError("존재하지 않는 유저입니다", userId);
  }
  const reviews = await getAllUserReviews(userId, cursor);
  return responseFromReviews(reviews);
};
export const listUserMissions = async (userId, cursor) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new NotFoundError("존재하지 않는 유저입니다", userId);
  }
  const missions = await getAllUserMissions(userId, cursor);
  return responseFromMission(missions);
};

export const userUpdate = async (data, email) => {
  const updataeUserId = await updateUser(
    {
      name: data.name,
      age: data.age,
      gender: data.gender,
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
      point: data.point,
    },
    email
  );

  if (!updataeUserId) {
    throw new NotFoundError("가입되지 않은 유저입니다");
  }

  const user = await getUserById(updataeUserId);

  return responseFromUser(user);
};
