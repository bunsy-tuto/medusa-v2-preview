import { Module } from "@medusajs/utils";

import helloWorldLoader from "./loaders/hello-world";
import HelloModuleService from "./service";

export const HELLO_MODULE = "helloModuleService";

export default Module(HELLO_MODULE, {
  service: HelloModuleService,
  loaders: [helloWorldLoader],
});
