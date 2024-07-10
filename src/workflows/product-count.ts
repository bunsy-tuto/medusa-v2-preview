import { IProductModuleService } from "@medusajs/types";
import { ModuleRegistrationName } from "@medusajs/utils";
import {
  createStep,
  StepResponse,
  createWorkflow,
} from "@medusajs/workflows-sdk";

type ProductCountWorkflowOutput = {
  count: number;
};

const step1 = createStep("step-1", async (_, context) => {
  const productModuleService: IProductModuleService = context.container.resolve(
    ModuleRegistrationName.PRODUCT
  );

  const [, count] = await productModuleService.listAndCountProducts();

  return new StepResponse(count);
});

const productCountWorkflow = createWorkflow<
  unknown,
  ProductCountWorkflowOutput
>("product-count", function () {
  const count = step1();

  return { count };
});

export default productCountWorkflow;
