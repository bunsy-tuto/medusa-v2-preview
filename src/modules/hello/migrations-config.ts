import path from "node:path";

import { defineMikroOrmCliConfig } from "@medusajs/utils";

import MyCustom from "./models/my-custom";

export default defineMikroOrmCliConfig("hello", {
  // biome-ignore lint/suspicious/noExplicitAny: MyCustom type should be defined later
  entities: [MyCustom] as any[],
  migrations: {
    path: path.join(__dirname, "migrations"),
  },
});
