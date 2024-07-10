import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export const GET = (req: MedusaRequest, res: MedusaResponse) => {
  res.json({
    message: `[GET] Hello, ${req.params.name}. Your ID is ${req.params.id}.`,
  });
};
