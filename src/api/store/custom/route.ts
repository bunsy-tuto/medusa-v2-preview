import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import type HelloModuleService from "src/modules/hello/service";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const helloModuleService: HelloModuleService =
    req.scope.resolve("helloModuleService");

  res.json({ message: helloModuleService.getMessage() });
}
