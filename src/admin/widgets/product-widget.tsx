import { defineWidgetConfig } from "@medusajs/admin-shared";
import { AdminProduct, DetailWidgetProps } from "@medusajs/types";
import { Container, Heading } from "@medusajs/ui";
import { Link } from "react-router-dom";

const ProductWidget = ({ data }: DetailWidgetProps<AdminProduct>) => {
  return (
    <Container>
      <Heading level="h2">Product Widget {data.title}</Heading>
      <Link to={"/orders"}>View Orders</Link>
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: "product.details.before",
});

export default ProductWidget;
