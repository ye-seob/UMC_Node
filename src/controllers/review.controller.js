import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { reviewAdd } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
  /*
    #swagger.summary = '리뷰 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_id: { type: "number" },
              store_id: { type: "number" },
              body: { type: "string" },
              score: { type: "number" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "리뷰 추가 성공 응답",
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
                  review: {
                    type: "object",
                    properties: {
                      review: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          userId: { type: "number" },
                          storeId: { type: "number" },
                          body: { type: "string" },
                          score: { type: "number" },
                          createdAt: { type: "string", format: "date-time" }
                        }
                      }
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
      description: "리뷰 추가 실패 응답",
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
                  reason: { type: "string", example: "이미 리뷰를 작성하셨습니다" },
                  data: {
                    type: "object",
                    properties: {
                      id: { type: "number" },
                      userId: { type: "number" },
                      storeId: { type: "number" },
                      body: { type: "string" },
                      score: { type: "number" },
                      createdAt: { type: "string", format: "date-time" }
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
    console.log("리뷰 추가를 요청했습니다!");

    const review = await reviewAdd(bodyToReview(req.body));
    res.status(StatusCodes.OK).success(review);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
