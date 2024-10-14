import { FormEvent, FormEventHandler, PropsWithChildren, Suspense, useEffect, useState } from "react";
import { Await, json, Link, Outlet, useLoaderData } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import Table from "../../components/shared/Table/Table";
import { Product } from "../../types/Product";
import { parse } from "../../network/response";
import { store as productStorage } from '../../storage/product';

export const loader = async () => {
  return {
    page: Promise.resolve(json({
      title: 'List'
    })).then(parse),
    result: productStorage.ids().then((ids) => parse(ids))
      .then(async (ids) => Promise.all((ids as string[]).map(id => productStorage.get(id)))),
    ui: Promise.resolve(json({
      title: 'Products'
    })).then(parse)
  };
};

const ProductRow = ({ datum, onChange, selected }: PropsWithChildren<{ datum: Product, onChange?: FormEventHandler<HTMLInputElement>, selected: boolean}>) => {
  return (
    <Table.Row key={`inventory-list-row-${datum.id}`}>
      <Table.Cell width="1"><input type="checkbox" name={`${datum.id}`} onChange={onChange} checked={selected}/></Table.Cell>
      <Table.Cell><Link to={`/product/detail/${datum.id}`} state={datum}>{datum?.name}</Link></Table.Cell>
      <Table.Cell>{datum.price?.symbol ?? datum.price?.unit}{datum.price?.amount}</Table.Cell>
      <Table.Cell>{datum.inventory?.amount}</Table.Cell>
      <Table.Cell>{datum.description}</Table.Cell>
      <Table.Cell width="100%"></Table.Cell>
    </Table.Row>
  );
}

const ProductListCard = ({ data, title,  }: PropsWithChildren<{ 
  data?: Product[], title: string}>) => {
    const [selection, setSelection] = useState({ ...data?.reduce((acc, cur) => ({ ...acc, [cur.id]: false }), { }) } as { [_: string]: boolean })
    const [selectedCount, setSelectedCount] = useState(0);

    useEffect(() => {
      setSelectedCount(Object.values(selection).reduce((acc, cur) => cur ? acc + 1 : acc, 0));
    }, [selection]);


    const onChange: FormEventHandler<HTMLInputElement> = (e: FormEvent<HTMLInputElement>) => {
      const input = e.target as HTMLInputElement;
      setSelection({ ...selection, [input.name]: (input.checked)})
    }

    return (
<Card>
  <Card.Header>
    <div className="flex">
      <div className="flex-grow">
        {title}
      </div>
      <div className="space-x-3">
        <Link to="./delete" state={Object.entries(selection).map(([k, v]) => v && data?.find((product) => product.id === k))}>
          Delete
        </Link>
        <Link to="./create">
            Create
        </Link>
      </div>
    </div>
  </Card.Header>
  <Table>
    <Table.Head className="drop-shadow-sm" RowElement={() =><Table.Head.Row>
        <Table.Cell width="1"><input type="checkbox" name="select-all" onChange={(e) => {
          setSelection(Object.keys(selection).reduce((acc, cur) => ({ ...acc, [cur]: e.target.checked }), { }))
        }} checked={selectedCount === data?.length} /></Table.Cell>
        <Table.Cell>Name</Table.Cell>
        <Table.Cell>Price</Table.Cell>
        <Table.Cell>Inventory</Table.Cell>
        <Table.Cell>Description</Table.Cell>
        <Table.Cell width="100%"></Table.Cell>
      </Table.Head.Row>}>
      
    </Table.Head>
    <Table.Body data={data} RowElement={(({ ...props }) => <ProductRow {...props} onChange={onChange} selected={selection[props.datum.id]} />)} />
  </Table>
</Card>
)};

const Page = () => {
  const data = useLoaderData() as { [_: string]: any };

  return (
    <div className="min-w-96">
    <Suspense fallback={<Card>
      <Card.Header>{data?.['page']?.['title'] ?? 'Loading'}</Card.Header>
      <div className="w-60 mx-auto p-3">
        Loading data.
      </div>
    </Card>}>
      <Await
        resolve={Promise.all([data.result, data.ui])}
        errorElement={<Card>
          <Card.Header>Error</Card.Header>
          <div className="w-60 mx-auto p-3">
            Failed to load Product List data.
          </div>
        </Card>}
      >
        {([result, ui]) => { 
          return <ProductListCard data={result} title={ui?.title ?? 'Products'}></ProductListCard>} }
      </Await>
    </Suspense>
    <Outlet />
    </div>
  );
}

export default { Card: ProductListCard, Page, loader }