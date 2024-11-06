import { prisma } from "../db.config.js";

// 가게 데이터 삽입
export const addStore = async (data) => {
  const store = await prisma.store.findFirst({
    where: { name: data.name, regionId: data.region_id },
  });

  if (store) {
    return null;
  }

  const created = await prisma.store.create({
    data: {
      name: data.name,
      address: data.address,
      regionId: data.region_id,
    },
  });
  return created.id;
};

// 가게 정보 얻기
export const getStore = async (storeId) => {
  if (!storeId) {
    throw Error("storeId is null!");
  }
  const store = await prisma.store.findFirstOrThrow({
    where: { id: storeId },
  });

  console.log(store);

  return store;
};
