import { prisma } from "../db.config.js";
import { NotFoundError } from "../error.js";

export const getRegionById = async (RegionId) => {
  const region = await prisma.region.findFirst({
    where: { id: RegionId },
  });

  return region;
};

// 가게 데이터 삽입
export const addStore = async (data) => {
  const created = await prisma.store.create({
    data: {
      name: data.name,
      address: data.address,
      regionId: data.region_id,
    },
  });
  return created.id;
};

//id로 가게 정보 얻기
export const getStoreById = async (storeId) => {
  const store = await prisma.store.findFirst({
    where: { id: storeId },
  });
  return store;
};

//이름과 지역으로 가게 정보 얻기
export const getStoreByName = async (name, region_id) => {
  const store = await prisma.store.findFirst({
    where: { name: name, regionId: region_id },
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
