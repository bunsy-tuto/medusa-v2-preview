import {
  MedusaRequest,
  MedusaNextFunction,
  MiddlewaresConfig,
  MedusaResponse,
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
  ],
};
