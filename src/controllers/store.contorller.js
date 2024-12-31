import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import {
  listStoreMissions,
  listStoreReviews,
  registerStore,
} from "../services/store.service.js";

export const handleAddStore = async (req, res, next) => {
  /* #swagger.summary = '상점 추가 API';
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            region_id: { type: "number" },
            name: { type: "string" },
            address: { type: "string" }
          }
        }
      }
    }
  };
  #swagger.responses[200] = {
    description: "상점 추가 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                store: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    regionId: { type: "number" },
                    name: { type: "string" },
                    address: { type: "string" },
                    score: { type: "number" },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
    description: "상점 추가 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "4001_DATA_NOT_FOUND" },
                reason: { type: "string", example: "이미 추가된 가게입니다." },
                data: { type: "null" }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
*/

  try {
    console.log("가게 추가를 요청했습니다!");

    const store = await registerStore(bodyToStore(req.body));
    res.status(StatusCodes.OK).success(store);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
  console.log("가게 리뷰 목록 조회를 요청하였습니다");
  try {
    const reviews = await listStoreReviews(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const handleListStoreMissions = async (req, res, next) => {
  /*
  #swagger.summary = '상점 미션 목록 조회 API';
  #swagger.parameters['storeId'] = {
    in: 'path',
    description: '상점 ID',
    required: true,
    schema: {
      type: 'number'
    }
  };
  #swagger.parameters['cursor'] = {
    in: 'query',
    description: '커서 (페이지네이션)',
    required: false,
    schema: {
      type: 'number'
    }
  };
  #swagger.responses[200] = {
    description: "상점 미션 목록 조회 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string" },
            error: { type: "object", nullable: true },
            success: {
              type: "object",
              properties: {
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "number" },
                      reward: { type: "number" },
                      missionSpec: { type: "string" },
                      deadline: { type: "string", format: "date-time" }
                    }
                  }
                },
                pagination: {
                  type: "object",
                  properties: {
                    cursor: { type: "number" }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
    description: "상점 미션 목록 조회 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string" },
                reason: { type: "string" },
                data: { type: "null" }
              }
            },
            success: { type: "object", nullable: true }
          }
        }
      }
    }
  };
*/

  console.log("가게 미션 목록 조회를 요청하였습니다");
  try {
    const missions = await listStoreMissions(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(missions);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
