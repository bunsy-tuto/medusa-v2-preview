import { defineWidgetConfig } from "@medusajs/admin-shared";

const ProductWidget = () => {
  return (
    <div>
      <h2>Product Widget</h2>
    </div>
  );
};

export const config = defineWidgetConfig({
  zone: "product.details.before",
});

export default ProductWidget;
