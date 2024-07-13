import { HELLO_MODULE } from "../../../modules/hello";

import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

type HelloWorldReq = {
  name: string;
};

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const helloModuleService = req.scope.resolve(HELLO_MODULE);

  const myCustoms = await helloModuleService.createMyCustoms([
    {
      name: "test 4",
    },
  ]);

  res.json({ message: "[GET] Hello, world!", myCustoms });
};

export const POST = (
  req: MedusaRequest<HelloWorldReq>,
  res: MedusaResponse,
) => {
  const { name } = req.body;

  res.json({ message: `[POST] Hello, ${name}!` });
};
