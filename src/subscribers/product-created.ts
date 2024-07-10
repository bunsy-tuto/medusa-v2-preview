import { IProductModuleService } from "@medusajs/types";
import { ModuleRegistrationName } from "@medusajs/utils";
import { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";

// subscriber function
export default async function productCreateHandler({
  data,
  container,
}: SubscriberArgs<{ id: string }>) {
  console.log("A product was created");

  const productModuleService: IProductModuleService = container.resolve(
    ModuleRegistrationName.PRODUCT
  );

  const productId = "data" in data ? data.data.id : data.id;

  const product = await productModuleService.retrieveProduct(productId);

  console.log(`The product ${product.title} was created`);
}

export const config: SubscriberConfig = {
  event: "product.created",
};
