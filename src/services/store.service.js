import { responseFromStore } from "../dtos/store.dto.js";
import { addStore, getStore } from "../repositories/store.repository.js";

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
