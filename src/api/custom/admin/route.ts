import { ModuleRegistrationName } from "@medusajs/utils";
import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { IUserModuleService } from "@medusajs/types";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  res.json({ message: "[GET] /custom/admin" });
}
