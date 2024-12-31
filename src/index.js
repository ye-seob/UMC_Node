import dotenv from "dotenv";

import express from "express";
import cors from "cors";

import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "./db.config.js";
import session from "express-session";

import mainRouter from "./routes/index.js";
import authRouter from "./routes/auth.route.js";

import { swaggerConfig } from "./swagger.config.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use("/api/v1", mainRouter);
app.use(authRouter);

app.use("/docs", swaggerConfig());
app.get("/openapi.json", swaggerConfig(true));

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
