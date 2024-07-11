import HelloModuleService from "../../../modules/hello/service";

import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const helloModuleService: HelloModuleService =
    req.scope.resolve("helloModuleService");

  res.json({ message: helloModuleService.getMessage() });
}
