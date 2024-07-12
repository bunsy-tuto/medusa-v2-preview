import ProductModule from "@medusajs/product";
import { defineLink } from "@medusajs/utils";

import HelloModule from "../modules/hello";

export default defineLink(
  { linkable: HelloModule.linkable.myCustom, isList: true },
  ProductModule.linkable.product,
);
