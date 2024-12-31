import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

export const swaggerConfig = (json = false) => {
  if (json) {
    return async (req, res, next) => {
      const options = {
        openapi: "3.0.0",
        disableLogs: true,
        writeOutputFile: false,
      };
      const outputFile = "/dev/null";
      const routes = ["./src/index.js"];
      const doc = {
        info: {
          title: "UMC 7th",
          description: "UMC 7th Node.js 테스트 프로젝트입니다.",
        },
        host: "localhost:3000",
      };

      const result = await swaggerAutogen(options)(outputFile, routes, doc);
      res.json(result ? result.data : null);
    };
  }

  return swaggerUiExpress.serve;
};
