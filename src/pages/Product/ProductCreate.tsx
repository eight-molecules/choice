import { json, Link, useLocation, useNavigate } from "react-router-dom";

import ProductForm from "./ProductForm";
import Modal from "../../components/Modal";

import { store as productStore } from '../../storage/product';
import { Product } from "../../types/Product";
import { parse } from "../../network/response";

export const loader = async () => ({
  page: Promise.resolve(json({ title: 'Create' })).then(parse)
});

export const ProductCreateCardHeader = ({ title, end }) => (
  <div className="flex">
    <div className="flex-grow">
      {title}
    </div>
    <div>
      {end}
    </div>
  </div>
);

export const create = async (e: React.FormEvent<HTMLFormElement>) => {
  e.stopPropagation();
  e.preventDefault();

  // This is a weird case where the form event is array-ish 
  // by containing the inputs in numbered keys, but Typescript
  // doesn't quite match the reality of that object shape.
  const { id, name, description } = Array.from(e.target as unknown as Array<any>).reduce((product, input, index) => {

    return {
      ...product,
      [input.name]: input.value
    }
  }, {} as Partial<Product>);

  await productStore.set(id, {
    id, name, description, inventory: { amount: '0' }, price: { amount: '37.00', unit: 'USD', symbol: '$' }
  });

  return id;
};


export const ProductCreateModal = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <Modal.Element id="product-create-modal">
      <div className="min-w-96 size-2/5 overflow-auto mx-auto">
        <ProductForm.Card title="Create" product={{ id: crypto.randomUUID(), ...state }} onSubmit={(e) => create(e).then((id) => navigate(`../${id}`))}
          headerEnd={<Link to="..">
            Close
          </Link>} />
      </div>
    </Modal.Element>
  );
}

export const ProductCreatePage = () => {
  const navigate = useNavigate();

  return <ProductForm.Card title="Create" product={{ id: crypto.randomUUID() }} onSubmit={(e) => create(e).then((id) => navigate(`../${id}`))} headerEnd={<Link to="..">
    Close
  </Link>} />
}

export default {
  Modal: ProductCreateModal,
  Page: ProductCreatePage,
  loader
};
