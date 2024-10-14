import { json, Link, Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import { useEffect, useId, useState } from "react";
import { parse } from "../../network/response";
import { store as productStore } from '../../storage/product';
import Table from "../../components/shared/Table/Table";
import { Id } from "../../types/Id";

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
  </div>
);

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const Page = () => {
  const id = useId();
  const navigate = useNavigate();
  const data = { result: { } } = useLoaderData() as { [_: string]: any };
  const { state } = useLocation();
  const [product, setProduct] = useState({ ...state });

  useEffect(() => {
    data.result.then((item) => setProduct({ ...state, ...item}));
  }, [])

  const refresh = (id) => {
    productStore.get(id).then((item) => setProduct({ ...state, ...item}));
  }
  const flatten = (obj: { [_: string]: any }, level = 0, prefix = '') => Object.entries(obj).map(([k, v]) => { 
    if (typeof v === 'object') {
      return [{k, v: ''}, ...flatten(v, level + 1, prefix)];
    }

    return {
      id: `${prefix}:${k}`,
      k,
      v,
      level
    }
  }).flat();

  return (<>
        <Card>
          <Card.Header left={product.name} right={<Link to="./edit">Edit</Link>} />
          <Table>
            <Table.Head>
              <Table.Head.Row>
                <Table.Cell>Field</Table.Cell>
                <Table.Cell>Value</Table.Cell>
                <Table.Cell width="100%"></Table.Cell>
              </Table.Head.Row>
            </Table.Head>
            <Table.Body data={flatten(product)} 
            RowElement={({ datum: { k, v, level, id} }: { datum: { k: string, v: string, level: number } & Id<string>}) => 
              <Table.Row>
                <Table.Cell className="pl-8">
                  <label htmlFor={id} className={`pl-${level * 4}`}>{capitalize(k)}</label>
                </Table.Cell>
                <Table.Cell>
                  <span id={id}>{v}</span>
                </Table.Cell>
                <Table.Cell width="100%"></Table.Cell>
              </Table.Row>}>
            </Table.Body>
          </Table>
        </Card>
        <Outlet context={{ data, refresh }}/>
    </>
  );
}

export default { Page, loader };
