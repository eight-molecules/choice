import { json, Link, useLoaderData, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import { FormEvent, PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { ProductItem } from "../../types/ProductItem";
import { store as productStore } from '../../storage/product';
import ProductForm from "./ProductForm";

export const loader = async () => ({
  page: json({ title: 'Create' })
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
  const { id, name, description, amount, } = Array.from(e.target as unknown as Array<any>).reduce((product, input, index) => {
    return {
      ...product,
      [input.name]: input.value
    }
  }, {});

  await productStore.set(id, {
    id, name, description, inventory: { amount }, price: { amount: '37.00', unit: 'USD', symbol: '$' }
  });

  console.log(id)

  return id;
};


export const ProductCreateModal = () => {
  const data = useLoaderData();
  const { state } = useLocation();

  return (
    <div id="modal-edit-product" className="absolute top-0 bottom-0 left-0 right-0 flex">
      <div className="w-full h-full relative">
        <div className="mx-auto">
          <div className="p-20">
            <ProductForm.Card product={{ ...state }} onSubmit={create} headerEnd={<Link to="..">
              <button>
                Close
              </button>
            </Link>} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const ProductCreatePage = () => {
  return <ProductForm.Card onSubmit={create} headerEnd={<Link to=".." />} />
}

export default {
  Modal: ProductCreateModal,
  Page: ProductCreatePage,
  loader
};
