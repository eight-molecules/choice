import { json, Link, Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import { useEffect, useState } from "react";
import { parse } from "../../network/response";
import { store as productStore } from '../../storage/product';

export const loader = async ({ params }) => {
  console.log('params', params);
  return {
    page: Promise.resolve(json({
      title: 'Item 1',
    })).then(parse),
    result: productStore.get(params.id)
}
}

const CardHeader = ({ title }) => (
  <div className="flex">
    <div className="flex-grow">
      {title}
    </div>
    <div>
      <Link to="./edit">
        <button>
          Edit
        </button>
      </Link>
    </div>
  </div>
);

const Page = () => {
  const navigate = useNavigate();
  const data = { result: { } } = useLoaderData() as { [_: string]: any };
  const { state } = useLocation();
  const [item, setItem] = useState({ ...state });

  useEffect(() => {
    data.result.then((item) => setItem({ ...state, ...item}));
  }, [])

  const refresh = (id) => {
    productStore.get(id).then((item) => setItem({ ...state, ...item}));
  }

  return (<>
        <Card >
          <Card.Header><CardHeader title={item.name}/></Card.Header>
            <div className="p-3 flex flex-wrap">
              <div className="grow p-3 min-w-80 w-full">
              <label>Name: </label>
                <span>{item.name}</span>
              </div>
              <div className="grow p-3 min-w-80 w-full">
              <label>Inventory: </label>
                <span>{item.inventory?.amount}</span>
              </div>
              <div className="grow p-3 min-w-80 w-full">
              <label>Description: </label>
                <span>{item.description}</span>
              </div>
            </div>
        </Card>
        <Outlet context={{ data, refresh }}/>
    </>
  );
}

export default { Page, loader };
