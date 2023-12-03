import { useEffect, useRef, useState } from "react";
import { Product } from "./ProductCard";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface Props {
  isOpen: boolean;
  product: Product | undefined;
  handleClose: () => void;
  handleSubmitProduct: (product: Product) => void;
}

/**
 * Product creation/edition form component
 */

export default function ProductForm({isOpen, product, handleClose, handleSubmitProduct}: Props) {
  const [formProduct, setFormProduct] = useState<Product>(product || {} as Product);
  useEffect(() => {
    setFormProduct(product || {} as Product);
  }, [product]);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploadWidget, setUploadWidget] = useState<any>()
  const imageUploadWidgetRef = useRef(null);
  useEffect(() => {
    setUploadWidget(window.cloudinary.createUploadWidget(
      {
        cloudName: "dsjcs2tj7",
        uploadPreset: "catedra2-idwm",
        sources: ['local', 'url'],
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: 'local',
        language: 'es',
        inlineContainer: imageUploadWidgetRef.current
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          setImageUrl(result.info.secure_url);
        }
      }
    ));
  }, [formProduct]);

  useEffect(() => {
    if (imageUrl)
      setFormProduct({...formProduct, imageUrl: imageUrl});
    }, [imageUrl]);

  useEffect(() => {
    if (isOpen)
      uploadWidget?.open();
    else {
      setImageUrl("");
      setFormProduct(product || {} as Product);
      uploadWidget?.close();
    }
  }, [isOpen]);

  return (
    <Modal show={isOpen} onClose={handleClose}>
      <Modal.Header>{product ? "Editar Producto" : "Añadir Producto"}</Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Nombre</Form.Label>
            <Form.Control
              required
              type="text"
              id="name"
              value={formProduct.name}
                onChange={(e) => setFormProduct({...formProduct, name: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="description">Descripción</Form.Label>
            <Form.Control
              type="areatext"
              id="description"
              value={formProduct.description}
              onChange={(e) => setFormProduct({...formProduct, description: e.target.value})}
            />
          </Form.Group>

          <Form.Label htmlFor="price">Precio</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              required
              type="number"
              id="price"
              value={formProduct.price}
              onChange={(e) => setFormProduct({...formProduct, price: parseInt(e.target.value)})}
            />
          </InputGroup>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Imagen</Form.Label>
            {isOpen && <Form.Control as="div" ref={imageUploadWidgetRef} id="image-upload-widget" />}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="primary" onClick={() => handleSubmitProduct(formProduct)}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
}