import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { IUserModuleService } from "@medusajs/types";
import { ModuleRegistrationName } from "@medusajs/utils";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  res.json({ message: "[GET] /custom/customer" });
}
