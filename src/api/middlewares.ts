import {
  MedusaRequest,
  MedusaNextFunction,
  MiddlewaresConfig,
  MedusaResponse,
  authenticate,
} from "@medusajs/medusa";

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
  ],
};
