//add store Request Dto
export const bodyToStore = (body) => {
  return {
    region_id: body.region_id,
    name: body.name,
    address: body.address || "",
  };
};

export const responseFromStore = (store) => {
  return {
    store,
  };
};
