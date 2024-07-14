import { defineRouteConfig } from "@medusajs/admin-shared";
import { Container, Heading } from "@medusajs/ui";

const CustomSettingPage = () => {
  return (
    <Container>
      <Heading level="h2">Custom Setting Page</Heading>
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Custom Setting Page",
});

export default CustomSettingPage;
