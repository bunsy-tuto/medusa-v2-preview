import { MedusaService } from "@medusajs/utils";

import { options } from "./../../../node_modules/eslint-plugin-import/node_modules/tsconfig-paths/src/options";
import MyCustom from "./models/my-custom";

// recommend to define type in another file
export type HelloModuleOptions = {
  capitalize?: boolean;
};

class HelloModuleService extends MedusaService({
  MyCustom,
}) {
  protected options_: HelloModuleOptions;

  constructor({}, options?: HelloModuleOptions) {
    super(...arguments);

    this.options_ = options || {
      capitalize: false,
    };
  }
}

export default HelloModuleService;
