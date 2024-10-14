import { json, Link, Outlet, useLoaderData, useLocation } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import { useEffect, useId, useState } from "react";
import { parse } from "../../network/response";
import { store as productStore } from '../../storage/product';
import Table from "../../components/shared/Table/Table";
import { Id } from "../../types/Id";
import Overflowable from "../../components/Overflowable";

export const loader = async ({ params }) => {
  return {
    page: Promise.resolve(json({
      title: 'Item 1',
    })).then(parse),
    result: productStore.get(params.id)
  }
}

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const Page = () => {
  const id = useId();
  const data = useLoaderData() as { [_: string]: any };
  const { state } = useLocation();
  const [product, setProduct] = useState(state?.product ?? { });

  useEffect(() => {
    data.result.then((item) => setProduct({ ...(state?.product ?? { }), ...item }));
  }, [data.result, state])

  const refresh = (id) => {
    productStore.get(id).then((item) => setProduct({ ...(state?.product ?? { }), ...item }));
  }

  const flatten = (obj: { [_: string]: any }, { prefix = '', level = 0 }) => Object.entries(obj).map(([k, v]) => {
    if (typeof v === 'object') {
      return [{ k }, ...flatten(v, { prefix: `${prefix}:${k}`, level: level + 1 })];
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
      <Overflowable x y>
      <Table>
        <Table.Head>
          <Table.Head.Row bg='bg-gray-50 dark:bg-gray-950'>
            <Table.Cell className="text-right">Field</Table.Cell>
            <Table.Cell>Value</Table.Cell>
            <Table.Cell width="100%"></Table.Cell>
          </Table.Head.Row>
        </Table.Head>
        <Table.Body data={flatten(product, { prefix: id })}
          RowElement={({ datum: { k, v, level, id } }: { datum: { k: string, v: string, level: number } & Id<string> }) =>
            <Table.Row bg={typeof v === 'undefined' ? 'bg-gray-200 dark:bg-gray-800' : undefined} >
              <Table.Cell className="text-right">
                <label htmlFor={id} className={`pl-${level * 4}`}>{capitalize(k)}</label>
              </Table.Cell>
              <Table.Cell>
                <span id={id}>{v}</span>
              </Table.Cell>
              <Table.Cell width="100%"></Table.Cell>
            </Table.Row>}>
        </Table.Body>
      </Table>
      </Overflowable>
    </Card>
    <Outlet context={{ data, refresh }} />
  </>
  );
}

export default { Page, loader };
