import { responseFromMission } from "../dtos/mission.dto.js";
import { responseFromReviews, responseFromStore } from "../dtos/store.dto.js";
import { NotFoundError } from "../error.js";
import {
  addStore,
  getAllStoreMissions,
  getAllStoreReviews,
  getStore,
} from "../repositories/store.repository.js";

export const storeAdd = async (data) => {
  const addStoreId = await addStore({
    region_id: data.region_id,
    name: data.name,
    address: data.address,
  });

  if (!addStoreId) {
    throw new NotFoundError("이미 추가된 가게입니다.", addStoreId);
  }

  const store = await getStore(addStoreId);
  return responseFromStore({ store });
};
export const listStoreReviews = async (storeId, cursor) => {
  const store = await getStore(storeId);
  if (!store) {
    throw new NotFoundError("존재하지 않은 가게입니다.");
  }
  const reviews = await getAllStoreReviews(storeId, cursor);

  return responseFromReviews(reviews);
};
export const listStoreMissions = async (storeId, cursor) => {
  const store = await getStore(storeId);
  if (!store) {
    throw new NotFoundError("존재하지 않은 가게입니다.");
  }
  const missions = await getAllStoreMissions(storeId, cursor);

  return responseFromMission(missions);
};
