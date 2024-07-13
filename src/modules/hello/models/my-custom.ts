import { model } from "@medusajs/utils";

const MyCustom = model.define("my_custom", {
  id: model.id().primaryKey(),
  name: model.text(),
  age: model.number().nullable(),
  has_account: model.boolean().default(false),
  color: model.enum(["black", "white"]).default("white"),
  date_of_birth: model.dateTime().nullable(),
  metadata: model.json().nullable(),
  names: model.array().nullable(),
});

export default MyCustom;
