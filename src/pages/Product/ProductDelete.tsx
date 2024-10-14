import { Form, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import Card from "../../components/shared/Card/Card";
import { FormEventHandler } from "react";
import { store as productStore } from '../../storage/product';

const ProductDeleteCard = ({ onSubmit }) => {
  return (
    <Card>
      <Card.Header
        left={<h1>Are you sure?</h1>}
        right={<Link to="..">Back</Link>} />
        <Form onSubmit={onSubmit} >
          <button>Delete</button>
        </Form>
    </Card>
  );
}

const ProductDeleteModal = () => {
  const { state } = useLocation();
  if (!Array.isArray(state)) {
    return <Navigate to=".." />
  }
  
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    for (const id of state) {
      productStore.delete(id)
    }
  }

  return (
    <Modal.Element id="delete-product-modal">
      <div className="min-w-96 size-2/5 overflow-auto mx-auto">
        <ProductDeleteCard onSubmit={onSubmit}/>
      </div>
    </Modal.Element>
  )
}

export default {
  Card: ProductDeleteCard,
  Modal: ProductDeleteModal
}