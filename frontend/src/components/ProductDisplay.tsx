import { Button, Col, Row } from "react-bootstrap";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import ProductCard, { Product } from "./ProductCard";
import ProductForm from "./ProductForm";

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

const CREATE_PRODUCT = gql`
  mutation CreateProduct($product: ProductData!) {
    createProduct(data: $product) {
      id
      name
      price
      description
      imageUrl
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: Int!, $product: ProductData!) {
    updateProduct(id: $id, data: $product) {
      id
      name
      price
      description
      imageUrl
    }
  }
`;

const DELETE_PRODUCT = gql`
mutation DeleteProduct($id: Int!) {
  deleteProduct(id: $id) {
    id
    name
  }
}
`;

export default function ProductDisplay(){
  const [products, setProducts]
    = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>({} as Product);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [createProductMutation] = useMutation(CREATE_PRODUCT, {
    onCompleted: (data) => {
      setProducts([...products, data.createProduct]);
    },
    onError: (error) => {
      let message = 'Error del servidor, disculpe las molestias';
      console.log(error)
      if (error.message.includes('missing')) {
        message = 'Los campos de nombre, precio e imagen son obligatorios';
      }
      alert(message);
    }
  });
  const [updateProductMutation] = useMutation(UPDATE_PRODUCT, {
    onCompleted: (data) => {
      setProducts(products.map((p) => p.id === data.updateProduct?.id ? data.updateProduct : p));
    },
    onError: (error) => {
      let message = 'Error del servidor, disculpe las molestias';
      console.log(error)
      if (error.message.includes('missing')) {
        message = 'Los campos de nombre, precio e imagen son obligatorios';
      }
      alert(message);
    }
  });
  const [deleteProductMutation] = useMutation(DELETE_PRODUCT, {
    onCompleted: (data) => {
      setProducts(products.filter((p) => p.id !== data.deleteProduct?.id));
    },
    onError: (error) => {
      let message = 'Error del servidor, disculpe las molestias';
      console.log(error)
      if (error.message.includes('Record to delete does not exist')) {
        message = 'El producto ya ha sido eliminado previamente';
      }
      alert(message);
    }
  });

  const { loading, error } = useQuery(GET_PRODUCTS, {
    onCompleted: data => setProducts([...data.products]),
    onError: error => <p>Error :(</p>
  });

  if(loading) return <p>Loading...</p>;

  return (
    <>
      <Button
        onClick={() => {
          setProduct({} as Product);
          setShowModal(true);
        }}
      >
        Añadir Producto
      </Button>
      <ProductForm
        isOpen={showModal}
        product={product}
        handleClose={() => setShowModal(false)}
        handleSubmitProduct={async (product: Product) => {
          console.log(product)
          if (!!product.id) {
            let id = product.id;
            let data: any = product;
            delete data.__typename;
            delete data.id;
            await updateProductMutation({variables: {id: id, product: data}});
          } else {
            await createProductMutation({variables: {product: product}});
          }
          setShowModal(false);
        }}
      />
      <Row>
        {products.map((product: Product) => (
          <Col key={product.id} lg={4} md={6} xs={12}>
            <ProductCard
              product={product}
              onEdit={() => {
                setProduct(product);
                setShowModal(true);
              }}
              onDelete={() => {deleteProductMutation({variables: {id: product.id}})}}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}