import { Module } from "@medusajs/utils";

import HelloModuleService from "./service";
import helloWorldLoader from "./loaders/hello-world";

export default Module("helloModuleService", {
  service: HelloModuleService,
  loaders: [helloWorldLoader],
});
