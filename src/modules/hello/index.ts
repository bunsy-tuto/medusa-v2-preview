import { Module } from "@medusajs/utils";

import HelloModuleService from "./service";

export default Module("helloModuleService", {
  service: HelloModuleService,
});
