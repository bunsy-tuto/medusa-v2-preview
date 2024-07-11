import { Module } from "@medusajs/utils";

import helloWorldLoader from "./loaders/hello-world";
import HelloModuleService from "./service";

export default Module("helloModuleService", {
  service: HelloModuleService,
  loaders: [helloWorldLoader],
});
