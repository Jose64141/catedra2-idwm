import { Button, Card } from "react-bootstrap";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import "./ProductCard.css";

export interface Product {
  id?: number,
  name: string,
  description: string,
  price: number,
  imageUrl: string
}
interface Props {
  product: Product,
  onEdit: () => void,
  onDelete: () => void
}

export default function ProductCard({product, onEdit, onDelete}: Props){
  return (
    <Card className="m-3 custom-card" >
      <Card.Img variant="top" className="m-3 w-auto" src={product.imageUrl} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>{`Precio: $${product.price}`}</Card.Text>
        <Button onClick={onEdit} className="me-3">
          <PencilFill />
        </Button>
        <Button onClick={onDelete} variant="danger" className="ms-3">
          <TrashFill />
        </Button>
      </Card.Body>
    </Card>
  );
}