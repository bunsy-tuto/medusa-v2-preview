import { Container } from "@medusajs/ui";
import { useParams } from "react-router-dom";

const CustomPage = () => {
  const { id } = useParams();

  return <Container>Passed ID: {id}</Container>;
};

export default CustomPage;
