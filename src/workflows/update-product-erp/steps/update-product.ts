import { IProductModuleService } from "@medusajs/types";
import { ModuleRegistrationName } from "@medusajs/utils";
import { createStep, StepResponse } from "@medusajs/workflows-sdk";

import { UpdateProductErpWorkflowInput } from "..";

const updateProduct = createStep(
  { name: "update-product" },
  async (input: UpdateProductErpWorkflowInput, context) => {
    const productModuleService: IProductModuleService =
      context.container.resolve(ModuleRegistrationName.PRODUCT);

    const { id } = input;

    const previousProductData = await productModuleService.retrieveProduct(id);

    const product = await productModuleService.updateProducts(id, input);

    return new StepResponse(product, {
      // pass to compensation function
      previousProductData,
    });
  },
  // compensation function
  async ({ previousProductData }, context) => {
    const productModuleService: IProductModuleService =
      context.container.resolve(ModuleRegistrationName.PRODUCT);

    const { id, type, options, variants, ...previousData } =
      previousProductData;

    // revert the product's data using the `previousProductData`
    await productModuleService.updateProducts(id, {
      ...previousData,
      variants: variants.map((variant) => {
        const variantOptions = {};

        variant.options.forEach((option) => {
          variantOptions[option.option.title] = option.value;
        });

        return { ...variant, options: variantOptions };
      }),
      options: options.map((option) => ({
        ...option,
        values: option.values.map((value) => value.value),
      })),
      type_id: type.id,
    });
  },
);

export default updateProduct;
