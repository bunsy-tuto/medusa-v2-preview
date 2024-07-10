import { ModuleRegistrationName } from "@medusajs/utils";
import { IProductModuleService } from "@medusajs/types";
import { MedusaContainer } from "@medusajs/medusa";

// the scheduled-job function
export default async function (container: MedusaContainer) {
  const productModuleService: IProductModuleService = container.resolve(
    ModuleRegistrationName.PRODUCT
  );

  const [, count] = await productModuleService.listAndCountProducts();

  console.log(`Currently, you have ${count} product(s)`);
}

// the job's configurations
export const config = {
  name: "every-minute-message",
  // execute every minute
  schedule: "* * * * *",
};
