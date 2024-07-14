import { IProductModuleService } from "@medusajs/types";
import { ModuleRegistrationName } from "@medusajs/utils";
import { createStep } from "@medusajs/workflows-sdk";

import { UpdateProductErpWorkflowInput } from "..";

const updateErp = createStep(
  { name: "update-erp" },
  async (input: UpdateProductErpWorkflowInput, context) => {
    // const productModuleService: IProductModuleService =
    //   context.container.resolve(ModuleRegistrationName.PRODUCT);
    // const erpModuleService: ErpModule = context.container.resolve("erpModuleService")

    const { id, ...updatedData } = input;

    // get previous ERP data
    // const previousErpData = await erp;
  },
);

export default updateErp;
