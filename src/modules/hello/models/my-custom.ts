import { model } from "@medusajs/utils";

const MyCustom = model.define("my_custom", {
  id: model.id().primaryKey(),
  name: model.text(),
  age: model.number().default(0),
  price: model.bigNumber().default(999.99),
  has_account: model.boolean().default(false),
  color: model.enum(["black", "white"]).default("white"),
  date_of_birth: model.dateTime(),
  metadata: model.json(),
  names: model.array(),
});

export default MyCustom;
