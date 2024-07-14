import {
  createStep,
  createWorkflow,
  StepResponse,
} from "@medusajs/workflows-sdk";

type testAdvancedWorkflowInputs = {
  message: string;
};

const step1 = createStep(
  {
    name: "testAdvancedWorkflow-step-1",
    maxRetries: 2,
  },
  async () => {
    const message = " Hello from step one!";
    console.log(`[Workflow::testAdvancedWorkflow-step-1] ${message}`);

    return new StepResponse(message);
  },
  async () => {
    console.log(
      "[Workflow::testAdvancedWorkflow-step-1] oops! Rolling back my changes...",
    );
  },
);

const step2 = createStep(
  {
    name: "testAdvancedWorkflow-step-2",
    maxRetries: 3,
    retryInterval: 2,
  },
  async () => {
    console.log(`[Workflow::testAdvancedWorkflow-step-2] Step 2 is executing`);
    throw new Error(
      "[Workflow::testAdvancedWorkflow-step-2] Throwing an error...",
    );
  },
);

const testAdvancedWorkflowWorkflow = createWorkflow<
  {},
  testAdvancedWorkflowInputs
>({ name: "test-compensation-fn", timeout: 2 }, (input) => {
  const str1 = step1();
  step2();

  return { message: str1 };
});

export default testAdvancedWorkflowWorkflow;
