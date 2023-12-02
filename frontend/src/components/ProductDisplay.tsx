import { Badge, Col, Row } from "react-bootstrap";
import { EnvelopeFill, Linkedin } from "react-bootstrap-icons";
import ProductCard from "./ProductCard";
import { gql, useQuery } from "@apollo/client";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      description
      imageUrl
    }
  }
`;

export default function ProductDisplay(){
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error :(</p>;

  return (
    <Row>
      {data.products.map((product: any) => (
        <Col key={product.id} lg={4} md={6} xs={12}>
          <ProductCard {...product}/>
        </Col>
      ))}
    </Row>
  );
}