import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToUser_mission } from "../dtos/mission.dto.js";
import {
  missionAdd,
  missionComplete,
  missionStart,
} from "../services/mission.service.js";

export const handleAddMission = async (req, res, next) => {
  /*
  #swagger.summary = '미션 추가  API';
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            mission_spec: { type: "string" },
            reward: { type: "number" }
          }
        }
      }
    }
  };
  #swagger.responses[200] = {
    description: "미션 추가 성공 응답",
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
                  type: "object",
                  properties: {
                    mission: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        storeId: { type: "number" },
                        reward: { type: "number" },
                        missionSpec: { type: "string" },
                        deadline: { type: "string", format: "date-time" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" }
                      }
                    }
                  }
                },
                pagination: {
                  type: "object",
                  properties: {
                    cursor: { type: "number", nullable: true }
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
    description: "미션 추가 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U999" },
                reason: { type: "string", example: "동일 미션이 존재합니다" },
                data: { type: "number", example: 2 }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
*/

  console.log("가게에 미션 추가를 요청했습니다!");

  try {
    const storeId = parseInt(req.params.storeId, 10);
    const mission = await missionAdd(bodyToMission(req.body, storeId));

    res.status(StatusCodes.OK).success(mission);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const handleMissionStart = async (req, res, next) => {
  /*
    #swagger.summary = '미션 시작 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_id: { type: "number" },
              mission_id: { type: "number" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 시작 성공 응답",
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
                    type: "object",
                    properties: {
                      mission: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          missionId: { type: "number" },
                          userId: { type: "number" },
                          status: { type: "string" },
                          createdAt: { type: "string", format: "date-time" },
                          updatedAt: { type: "string", format: "date-time" }
                        }
                      }
                    }
                  },
                  pagination: {
                    type: "object",
                    properties: {
                      cursor: { type: "number", nullable: true }
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
      description: "미션 시작 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U999" },
                  reason: { type: "string", example: "해당 미션은 이미 진행 중입니다" },
                  data: {
                    type: "object",
                    properties: {
                      id: { type: "number" },
                      missionId: { type: "number" },
                      userId: { type: "number" },
                      status: { type: "string" },
                      createdAt: { type: "string", format: "date-time" },
                      updatedAt: { type: "string", format: "date-time" }
                    }
                  }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("미션 진행을 요청했습니다!");
  try {
    const mission = await missionStart(bodyToUser_mission(req.body));
    res.status(StatusCodes.OK).success(mission);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const handleMissionComplete = async (req, res, next) => {
  /*
    #swagger.summary = '미션 완료 API';
    #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            user_id: { type: "number" },
            mission_id: { type: "number" }
          }
        }
      }
    }
    };
    #swagger.responses[200] = {
    description: "미션 완료 성공 응답",
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
                  type: "object",
                  properties: {
                    mission: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        storeId: { type: "number" },
                        reward: { type: "number" },
                        missionSpec: { type: "string" },
                        deadline: { type: "string", format: "date-time" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" }
                      }
                    }
                  }
                },
                pagination: {
                  type: "object",
                  properties: {
                    cursor: { type: "number", nullable: true }
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
    description: "미션 완료 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U999" },
                reason: { type: "string", example: "미션이 진행 중인 상태가 아닙니다." },
                data: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    missionId: { type: "number" },
                    userId: { type: "number" },
                    status: { type: "string" },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" }
                  }
                }
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
    console.log("미션 완료를 요청했습니다!");

    const mission = await missionComplete(bodyToUser_mission(req.body));
    res.status(StatusCodes.OK).success(mission);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
