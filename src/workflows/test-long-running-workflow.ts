import {
  createStep,
  createWorkflow,
  StepResponse,
} from "@medusajs/workflows-sdk";

type TestLongRunningWorkflowInput = {};

type TestLongRunningWorkflowOutput = {};

/**
 * Steps
 */

const step1 = createStep({ name: "step-1" }, async () => {
  return new StepResponse({});
});

// async: true => long running step
const step2 = createStep({ name: "step-2", async: true }, async () => {
  return new StepResponse({});
  // throw new Error(
  //   "[testLongRunningWorkflow::step2] something went wrong in step 2",
  // );
});

const step3 = createStep({ name: "step-3" }, async () => {
  return new StepResponse("Finished 3 steps");
});

/**
 * Workflow
 */
const testLongRunningWorkflow = createWorkflow<
  TestLongRunningWorkflowInput,
  TestLongRunningWorkflowOutput
>({ name: "test-long-running-workflow" }, (input) => {
  step1();
  step2();
  const message = step3();

  return { message };
});

export default testLongRunningWorkflow;
