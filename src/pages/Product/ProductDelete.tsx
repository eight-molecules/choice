import { Link, useLocation } from "react-router-dom";
import Modal from "../../components/Modal";
import Card from "../../components/shared/Card/Card";
import ThreeColumnLayout from "../../components/Layout/ThreeColumnLayout";

const ProductDeleteCard = () => {
  return (

    <Card>
      <Card.Header
        left={<h1>Are you sure?</h1>}
        right={<Link to="..">Back</Link>} />
    </Card>
  );
}

const ProductDeleteModal = () => {
  const { state } = useLocation();

  return (
    <Modal id="delete-product-modal">
      <div className="min-w-96 size-2/5 overflow-auto mx-auto">
        <ProductDeleteCard />
      </div>
    </Modal>
  )
}

export default {
  Card: ProductDeleteCard,
  Modal: ProductDeleteModal
}