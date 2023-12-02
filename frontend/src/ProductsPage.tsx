import Header from "./components/Header";
import { Container } from "react-bootstrap";
import ProductDisplay from "./components/ProductDisplay";

export default function ProductsPage() {

  return (
    <>
      <Header />
      <Container className="mt-4 text-center">
        <ProductDisplay />
      </Container>
    </>
  );
}