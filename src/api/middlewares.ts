import {
  authenticate,
  MedusaNextFunction,
  MedusaRequest,
  MedusaResponse,
  MiddlewaresConfig,
} from "@medusajs/medusa";
import { ConfigModule } from "@medusajs/types";
import { parseCorsOrigins } from "@medusajs/utils";
import cors from "cors";

export const config: MiddlewaresConfig = {
  routes: [
    {
      matcher: "/store*",
      method: ["POST", "PUT"],
      middlewares: [
        (req: MedusaRequest, res: MedusaResponse, next: MedusaNextFunction) => {
          console.log("Received a request!");

          next();
        },
      ],
    },
    {
      matcher: "/custom/admin*",
      method: ["GET"],
      middlewares: [authenticate("user", ["session", "bearer", "api-key"])],
    },
    {
      matcher: "/custom/customer*",
      method: ["GET"],
      middlewares: [authenticate("customer", ["session", "bearer", "api-key"])],
    },
    {
      matcher: "/custom*",
      middlewares: [
        (req: MedusaRequest, res: MedusaResponse, next: MedusaNextFunction) => {
          const configModule: ConfigModule = req.scope.resolve("configModule");

          return cors({
            origin: parseCorsOrigins(configModule.projectConfig.http.storeCors),
            credential: true,
          })(req, res, next);
        },
      ],
    },
  ],
};
