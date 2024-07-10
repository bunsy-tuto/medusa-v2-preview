import {
  createStep,
  StepResponse,
  createWorkflow,
} from "@medusajs/workflows-sdk";

type WorkflowInput = {
  name: string;
};

type WorkflowOutput = {
  message: string;
};

const step1 = createStep("step-1", async (_, context) => {
  return new StepResponse(`Hello from step one!`);
});

const step2 = createStep("step-2", async ({ name }: WorkflowInput) => {
  return new StepResponse(`Hello ${name} from step two!`);
});

const myWorkflow = createWorkflow<WorkflowInput, WorkflowOutput>(
  "hello-world",
  function (input) {
    const str1 = step1();
    // to pass input
    const str2 = step2(input);

    return { message: str2 };
  }
);

export default myWorkflow;
