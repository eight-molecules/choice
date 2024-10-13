import { json, Link, useOutletContext } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import { PropsWithChildren } from "react";
import { ProductItem } from "../../types/ProductItem";

const loader = () => json({ page: { title: 'Create' }});

const CardHeader = ({ title }) => (
  <div className="flex">
    <div className="flex-grow">
      {title}
    </div>
    <div>
      <Link to="..">
        <button>
          Close
        </button>
      </Link>
    </div>
  </div>
);

const ProductCreateCard = ({ product }: PropsWithChildren<{ product?: ProductItem }>) => {
  return (
  <Card>
    <Card.Header><CardHeader title="Create" /></Card.Header>
    <div className="p-3 flex flex-wrap">
      <div className="grow p-3 min-w-80 w-full">
        <label>Name: </label>
        <input value={product?.name} placeholder={"Product Name"} />
      </div>
      <div className="grow p-3 min-w-80 w-full">
        <label htmlFor="inventory-input">Inventory: </label>
        <input name="inventory-input" value={product?.name} placeholder={"Product Name"} />
        <span>{product?.inventory.amount}</span>
      </div>
      <div className="grow p-3 min-w-80 w-full">
        <label>Description: </label>
        <span>{product?.description}</span>
      </div>
    </div>
  </Card>
  );
};
  
const Modal = () => {
  const data = useOutletContext() as { [_: string]: any };

  return (
    <div id="modal-edit-product" className="absolute top-0 bottom-0 left-0 right-0 flex">
      <div className="w-full h-full relative">
        <div className="mx-auto">
          <div className="p-20">
            <ProductCreateCard />
          </div>
        </div>
      </div>
    </div>
  );
}

const Page = () => {
  return <ProductCreateCard />
}

export default {
  Modal,
  Page,
  loader
};
