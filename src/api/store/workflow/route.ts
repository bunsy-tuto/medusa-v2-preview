import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { IWorkflowEngineService } from "@medusajs/types";
import { ModuleRegistrationName } from "@medusajs/utils";

import myWorkflow from "../../../workflows/hello-world";
import productCountWorkflow from "../../../workflows/product-count";
import testAdvancedWorkflowWorkflow from "../../../workflows/test-advanced-workflow";
import testLongRunningWorkflow from "../../../workflows/test-long-running-workflow";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  /**
   * Basic workflow
   */
  //   const { result } = await myWorkflow(req.scope).run({
  //     input: {
  //       name: req.query.name as string,
  //     },
  //   });

  // const { result } = await productCountWorkflow(req.scope).run();

  /**
   * Advanced workflow
   */
  // const { result, errors } = await testAdvancedWorkflowWorkflow(req.scope).run({
  //   throwOnError: false,
  // });

  // if (errors.length) {
  //   return res.send({
  //     errors: errors.map((error) => error.error),
  //   });
  // }

  /**
   * Long-running workflow
   */

  const { transaction, result } = await testLongRunningWorkflow(
    req.scope,
  ).run();

  const workflowEngineModuleService = req.scope.resolve<IWorkflowEngineService>(
    ModuleRegistrationName.WORKFLOW_ENGINE,
  );

  const subscriptionOptions = {
    workflowId: "test-long-running-workflow",
    transactionId: transaction.transactionId,
    subscriberId: "test-long-running-subscriber",
  };

  await workflowEngineModuleService.subscribe({
    ...subscriptionOptions,
    subscriber: async (data) => {
      if (data.eventType === "onFinish") {
        console.log(
          "[longRunningWorkflow::workflowEngineModuleService] Finished execution",
          data.result,
        );

        // unsubscribe
        await workflowEngineModuleService.unsubscribe({
          ...subscriptionOptions,
          subscriberOrId: subscriptionOptions.subscriberId,
        });
      } else if (data.eventType === "onStepFailure") {
        console.log(
          "[longRunningWorkflow::workflowEngineModuleService] Workflow failed",
          data.step,
        );
      }
    },
  });

  res.send(result);
}
