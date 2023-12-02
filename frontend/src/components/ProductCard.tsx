import { Button, Card } from "react-bootstrap";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import "./ProductCard.css";

interface Props {
  name: string,
  description: string,
  price: number,
  imageUrl: string
}
export default function ProductCard({name, description, price, imageUrl}: Props){
  return (
    <Card className="m-3 custom-card" >
      <Card.Img variant="top" className="m-3 w-auto" src={imageUrl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{`Precio: $${price}`}</Card.Text>
        <Button className="me-3">
          <PencilFill />
        </Button>
        <Button variant="danger" className="ms-3">
          <TrashFill />
        </Button>
      </Card.Body>
    </Card>
  );
}