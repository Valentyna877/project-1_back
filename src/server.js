import express, { json } from "express";
import "dotenv/config";
import cors from "cors";
import { ENV_VARS } from "./constants/envVars.js";
import { errors } from "celebrate";
import { connectToMongoDB } from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import { logger } from "./middlewares/logger.js";
import { getEnvVar } from "./utils/getEnvVar.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import router from "./routes/index.js";
// import { UPLOAD_DIR } from './constants/path.js';
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./docs/openapi.yaml");

export const startServer = () => {
  const app = express();

  app.use(
    logger,
    cors({
      origin: [
        "https://vercel.app",
        "http://localhost:3000",
        "http://localhost:3001",
      ],
      credentials: true,
      methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
    helmet(),
    cookieParser(),
    json({
      type: ["application/vnd.api+json", "application/json"],
      limit: "100kb",
    }),
  );

  app.use("/api/", router);
  // app.use('/uploads', express.static(UPLOAD_DIR));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(notFoundHandler);
  app.use(errors());
  app.use(errorHandler);

  const PORT = getEnvVar(ENV_VARS.PORT, 3000);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
};

connectToMongoDB().then(() => {
  startServer();
});
