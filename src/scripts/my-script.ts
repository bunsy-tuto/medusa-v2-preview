import { ExecArgs, IProductModuleService } from "@medusajs/types";
import { ModuleRegistrationName } from "@medusajs/utils";

export default async function myScript({ container }: ExecArgs) {
  const productModuleService: IProductModuleService = container.resolve(
    ModuleRegistrationName.PRODUCT,
  );

  const [, count] = await productModuleService.listAndCountProducts();
  console.log("🚀 ~ myScript ~ count:", { count });
}
