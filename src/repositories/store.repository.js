import { prisma } from "../db.config.js";
import { NotFoundError } from "../error.js";

// 가게 데이터 삽입
export const addStore = async (data) => {
  const region = await prisma.region.findFirst({
    where: { id: data.region_id },
  });

  if (!region) {
    throw new NotFoundError("지원하지 않는 지역입니다", data.region_id);
  }
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
  const store = await prisma.store.findFirst({
    where: { id: storeId },
  });
  return store;
};

export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: { id: true, body: true, store: true, user: true },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};
export const getAllStoreMissions = async (storeId, cursor) => {
  const missions = await prisma.mission.findMany({
    select: {
      id: true,
      reward: true,
      missionSpec: true,
      deadline: true,
    },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return missions;
};
