import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import {
  listUserMissions,
  listUserReviews,
  userSignUp,
} from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              detailAddress: { type: "string" },
              phoneNumber: { type: "string" },
              preferences: { type: "array", items: { type: "number" } }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
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
                  email: { type: "string" },
                  name: { type: "string" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("회원가입을 요청했습니다!");

  try {
    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.OK).success(user);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};
export const handleListUserReviews = async (req, res, next) => {
  /*
  #swagger.summary = '사용자 리뷰 목록 조회 API';
  #swagger.parameters['userId'] = {
    in: 'path',
    description: '사용자 ID',
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
    description: "사용자 리뷰 목록 조회 성공 응답",
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
                      body: { type: "string" },
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
                      },
                      user: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          email: { type: "string" },
                          name: { type: "string" },
                          gender: { type: "string" },
                          age: { type: "number" },
                          address: { type: "string" },
                          detailAddress: { type: "string" },
                          phoneNumber: { type: "string" },
                          status: { type: "string" },
                          socialType: { type: "string" },
                          createdAt: { type: "string", format: "date-time" },
                          updatedAt: { type: "string", format: "date-time" },
                          point: { type: "number" }
                        }
                      }
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
    description: "사용자 리뷰 목록 조회 실패 응답",
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
                data: { type: "number" }
              }
            },
            success: { type: "object", nullable: true }
          }
        }
      }
    }
  };
*/

  console.log("유저 리뷰 목록 조회를 요청하였습니다.");
  try {
    const reviews = await listUserReviews(
      parseInt(req.params.userId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};
export const handleListUserMissions = async (req, res, next) => {
  /*
  #swagger.summary = '사용자 미션 목록 조회 API';
  #swagger.parameters['userId'] = {
    in: 'path',
    description: '사용자 ID',
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
    description: "사용자 미션 목록 조회 성공 응답",
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
                      status: { type: "string" },
                      mission: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          reward: { type: "number" },
                          missionSpec: { type: "string" },
                          deadline: { type: "string", format: "date-time" }
                        }
                      }
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
    description: "사용자 미션 목록 조회 실패 응답",
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
                data: { type: "number" }
              }
            },
            success: { type: "object", nullable: true }
          }
        }
      }
    }
  };
*/

  console.log("유저 미션 목록 조회를 요청하였습니다.");
  try {
    const missions = await listUserMissions(
      parseInt(req.params.userId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(missions);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};
