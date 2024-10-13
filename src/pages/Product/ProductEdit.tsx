import { Await, json, Link, useLocation, useNavigate, useOutletContext, useRevalidator } from "react-router-dom";
import Modal from '../../components/Modal';
import { store as productStore } from '../../storage/product';
import { FormEvent, PropsWithChildren, ReactNode, Suspense, useEffect, useState } from "react";
import ProductForm, { ProductFormCardProps } from "./ProductForm";
import { parse } from "../../network/response";

export const loader = async ({ params }) => {
  return {
    page: Promise.resolve(json({ title: 'Edit' }))
      .then(parse),
    result: productStore.get(params.id)
  }
}
const edit = async (e: FormEvent<HTMLFormElement>) => {
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

  if (!id || !(await productStore.get(id))) {
    throw new Error('Cannot edit a product that does not exist.');
  };

  await productStore.set(id, {
    id, name, description, inventory: { amount }, price: { amount: '37.00', unit: 'USD', symbol: '$' }
  });

  return id;
};

const ProductEditCard = ({ product, headerEnd, onSubmit, loading = false }: PropsWithChildren<ProductFormCardProps>) => {
  return (
  <ProductForm.Card product={product} title={`Edit ${product?.name}`} headerEnd={headerEnd} onSubmit={onSubmit} loading={loading}/>
)};

const ProductEditModal = () => {
  const navigate = useNavigate();
  const { data, refresh } = useOutletContext() as { [_: string]: any };
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    data.result.then(() => setLoading(false))
  }, [])

  return (
    <Modal id="modal-edit-product">
      <Suspense fallback={<ProductEditCard product={{ ...state }} headerEnd={<Link to='..'><button>Close</button></Link>} loading={loading}/>} >
      <Await resolve={data.result}>
        {(product) =>
          <ProductEditCard product={product} headerEnd={<Link to='..'><button>Close</button></Link>} onSubmit={(e) => {
            setLoading(true);
            edit(e)
            .then((id) => refresh?.(id))
            .then(() => navigate(`..`))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
          }}/>}
      </Await>
      </Suspense>
    </Modal>
  );
}

export default {
  Modal: ProductEditModal,
  Card: ProductEditCard,
  loader
};
