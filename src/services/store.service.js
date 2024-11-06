import { responseFromMission } from "../dtos/mission.dto.js";
import { responseFromReviews, responseFromStore } from "../dtos/store.dto.js";
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

  if (addStoreId === null) {
    throw new Error("존재하지 않는 지역입니다.");
  }

  const store = await getStore(addStoreId);
  return responseFromStore({ store });
};
export const listStoreReviews = async (storeId, cursor) => {
  const reviews = await getAllStoreReviews(storeId, cursor);
  return responseFromReviews(reviews);
};
export const listStoreMissions = async (storeId, cursor) => {
  const missions = await getAllStoreMissions(storeId, cursor);
  return responseFromMission(missions);
};
