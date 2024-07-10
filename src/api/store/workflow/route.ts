import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import myWorkflow from "../../../workflows/hello-world";
import productCountWorkflow from "../../../workflows/product-count";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  //   const { result } = await myWorkflow(req.scope).run({
  //     input: {
  //       name: req.query.name as string,
  //     },
  //   });

  const { result } = await productCountWorkflow(req.scope).run();

  res.send(result);
}
