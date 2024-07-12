import { LoaderOptions } from "@medusajs/modules-sdk";

import { HelloModuleOptions } from "../service";

export default async function helloWorldLoader({
  options,
}: LoaderOptions<HelloModuleOptions>) {
  console.log("[HELLO MODULE] Just started the Medusa application!", {
    options,
  });
}
