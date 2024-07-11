import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { IUserModuleService } from "@medusajs/types";
import { ModuleRegistrationName } from "@medusajs/utils";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const userModuleService: IUserModuleService = req.scope.resolve(
    ModuleRegistrationName.USER,
  );

  // @ts-ignore
  const user = await userModuleService.retrieveUser(req.auth_context.actor_id);

  res.json({ user });
}
