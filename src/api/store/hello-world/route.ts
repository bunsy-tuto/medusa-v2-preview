import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

type HelloWorldReq = {
  name: string;
};

export const GET = (req: MedusaRequest, res: MedusaResponse) => {
  res.json({ message: "[GET] Hello, world!" });
};

export const POST = (
  req: MedusaRequest<HelloWorldReq>,
  res: MedusaResponse
) => {
  const { name } = req.body;

  res.json({ message: `[POST] Hello, ${name}!` });
};
