import { IProductModuleService } from "@medusajs/types";
import { ModuleRegistrationName } from "@medusajs/utils";
import {
  createStep,
  createWorkflow,
  StepResponse,
} from "@medusajs/workflows-sdk";

type ProductCountWorkflowOutput = {
  count: number;
};

/**
 * Step constraint:
 * 1. return primitive values or objects
 */
const step1 = createStep(
  "step-1",
  async (_, context) => {
    const productModuleService: IProductModuleService =
      context.container.resolve(ModuleRegistrationName.PRODUCT);

    const [, count] = await productModuleService.listAndCountProducts();

    return new StepResponse(count);
  },
  // this is a `compensation function`
  async () => {
    console.log("oops! Rolling back my changes...");
  },
);

/**
 * Workflow constraints:
 * 1. No async function in Workflow, but you can use `async` function in each step
 * 2. No direct data manipulation, instead use transform()
 * 3. No if-condition, instead use when().then()
 */
//
const productCountWorkflow = createWorkflow<
  unknown,
  ProductCountWorkflowOutput
>("product-count", function () {
  const count = step1();

  return { count };
});

export default productCountWorkflow;
