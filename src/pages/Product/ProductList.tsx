import { PropsWithChildren } from "react";
import { json, Link, useLoaderData } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import Table from "../../components/shared/Table/Table";
import { ProductItem } from "../../types/ProductItem";

export const loader = async () => {
  return json({
    page: {
      title: 'List'
    },
    result: [
      { id: 1, name: 'Item 1', price: { amount: "37.00", unit: "USD", symbol: "$" }, inventory: { amount: "43" } },
      { id: 2, name: 'Item 2', price: { amount: "37.00", unit: "USD", symbol: "$" }, inventory: { amount: "22" } },
      { id: 9, name: 'Item 9', price: { amount: "37.00", unit: "USD", symbol: "$" }, inventory: { amount: "0" } },
      { id: 4, name: 'Item 4', price: { amount: "37.00", unit: "USD", symbol: "$" }, inventory: { amount: "12" } },
      { id: 5, name: 'Item 5', price: { amount: "37.00", unit: "USD", symbol: "$" }, inventory: { amount: "2" } },
      { id: 7, name: 'Item 7', price: { amount: "37.00", unit: "USD", symbol: "$" }, inventory: { amount: "1" } },
      { id: 3, name: 'Item 3', price: { amount: "37.00", unit: "USD", symbol: "$" }, inventory: { amount: "31" } },
      { id: 6, name: 'Item 6', price: { amount: "37.00", unit: "USD", symbol: "$" }, inventory: { amount: "8" } },
    ]
  });
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
    <Table.Header className="drop-shadow-sm">
      <Table.Header.Row>
        <Table.Cell width="1"><input type="checkbox" /></Table.Cell>
        <Table.Cell>Name</Table.Cell>
        <Table.Cell>Price</Table.Cell>
        <Table.Cell>Inventory</Table.Cell>
        <Table.Cell width="100%"></Table.Cell>
      </Table.Header.Row>
    </Table.Header>
    <Table.Body data={data} RowElement={ProductRow}>
    </Table.Body>
  </Table>
</Card>
)};

const Page = () => {
  const data = useLoaderData() as { [_: string]: any };

  return (
    <ProductListCard data={data?.['result']} title={data?.page.title} />
  );
}

export default { Card: ProductListCard, Page, loader }