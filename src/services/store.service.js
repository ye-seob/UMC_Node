import { responseFromMission } from "../dtos/mission.dto.js";
import { responseFromReviews, responseFromStore } from "../dtos/store.dto.js";
import { AlreadyExistError, NotFoundError } from "../error.js";
import {
  addStore,
  getAllStoreMissions,
  getAllStoreReviews,
  getRegionById,
  getStoreById,
  getStoreByName,
} from "../repositories/store.repository.js";

export const registerStore = async (data) => {
  const region = await getRegionById(data.region_id);

  if (!region) {
    throw new NotFoundError("지원하지 않는 지역입니다", data.region_id);
  }

  const existingStore = await getStoreByName(data.name, data.region_id);

  if (existingStore) {
    throw new AlreadyExistError("이미 존재하는 가게입니다", data.name);
  }

  const addStoreId = await addStore({
    region_id: data.region_id,
    name: data.name,
    address: data.address,
  });

  const store = await getStoreById(addStoreId);

  return responseFromStore({ store });
};
export const listStoreReviews = async (storeId, cursor) => {
  const store = await getStoreById(storeId);
  if (!store) {
    throw new NotFoundError("존재하지 않은 가게입니다.", storeId);
  }
  const reviews = await getAllStoreReviews(storeId, cursor);

  return responseFromReviews(reviews);
};
export const listStoreMissions = async (storeId, cursor) => {
  const store = await getStoreById(storeId);
  if (!store) {
    throw new NotFoundError("존재하지 않은 가게입니다.");
  }
  const missions = await getAllStoreMissions(storeId, cursor);

  return responseFromMission(missions);
};
