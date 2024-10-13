import { PropsWithChildren, Suspense } from "react";
import { Await, json, Link, useLoaderData } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import Table from "../../components/shared/Table/Table";
import { ProductItem } from "../../types/ProductItem";
import { parse } from "../../network/response";

export const loader = async () => {
  return {
    page: Promise.resolve(json({
      title: 'List'
    })).then(parse),
    result: Promise.resolve(json([
      { id: 1, name: 'Item 1', price: { amount: "37.00", unit: "USD", symbol: "$" }, inventory: { amount: "43" } },
      { id: 2, name: 'Item 2', price: { amount: "37.00", unit: "USD", symbol: "$" }, inventory: { amount: "22" } },
      { id: 9, name: 'Item 9', price: { amount: "37.00", unit: "USD", symbol: "$" }, inventory: { amount: "0" } },
      { id: 4, name: 'Item 4', price: { amount: "37.00", unit: "USD", symbol: "$" }, inventory: { amount: "12" } },
      { id: 5, name: 'Item 5', price: { amount: "37.00", unit: "USD", symbol: "$" }, inventory: { amount: "2" } },
      { id: 7, name: 'Item 7', price: { amount: "37.00", unit: "USD", symbol: "$" }, inventory: { amount: "1" } },
      { id: 3, name: 'Item 3', price: { amount: "37.00", unit: "USD", symbol: "$" }, inventory: { amount: "31" } },
      { id: 6, name: 'Item 6', price: { amount: "37.00", unit: "USD", symbol: "$" }, inventory: { amount: "8" } },
    ] as ProductItem[])).then(parse),
    ui: Promise.resolve(json({
      title: 'Products'
    })).then(parse)
  };
};

const CardHeader = ({ title }) => (
  <div className="flex">
    <div className="flex-grow">
      {title}
    </div>
    <div>
      <Link to="./create">
        <button>
          Create
        </button>
      </Link>
    </div>
  </div>
);

const ProductRow = ({ datum }: PropsWithChildren<{ datum: ProductItem }>) => {
  return (
    <Table.Row key={`inventory-list-row-${datum.id}`}>
      <Table.Cell width="1"><input type="checkbox" /></Table.Cell>
      <Table.Cell><Link to={`/product/detail/${datum.id}`} state={datum}>{datum.name}</Link></Table.Cell>
      <Table.Cell>{datum.price.symbol ?? datum.price.unit}{datum.price.amount}</Table.Cell>
      <Table.Cell>{datum.inventory.amount}</Table.Cell>
      <Table.Cell width="100%"></Table.Cell>
    </Table.Row>
  );
}

const ProductListCard = ({ className, data, title,  }: PropsWithChildren<{ 
  className?: string,
  data?: ProductItem[], title: string}>) => {
    return (
<Card>
  <Card.Header>
    <CardHeader title={title} />
  </Card.Header>
  <Table>
    <Table.Head className="drop-shadow-sm" RowElement={() =><Table.Head.Row>
        <Table.Cell width="1"><input type="checkbox" /></Table.Cell>
        <Table.Cell>Name</Table.Cell>
        <Table.Cell>Price</Table.Cell>
        <Table.Cell>Inventory</Table.Cell>
        <Table.Cell width="100%"></Table.Cell>
      </Table.Head.Row>}>
      
    </Table.Head>
    <Table.Body data={data} RowElement={ProductRow}>
    </Table.Body>
  </Table>
</Card>
)};

const Page = () => {
  const data = useLoaderData() as { [_: string]: any };
  return (
    <Suspense>
      <Await resolve={Promise.all([ data?.result, data?.ui ]) }>{([ result, ui ]) => {
        return <ProductListCard data={result} title={ui.title} />
      }}
      </Await>
    </Suspense>
  );
}

export default { Card: ProductListCard, Page, loader }