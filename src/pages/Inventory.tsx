
import { PropsWithChildren } from "react";
import { json, Link, useLoaderData } from "react-router-dom";
import Card from "../components/shared/Card/Card";
import ThreeColumnLayout from "../components/shared/ThreeColumnLayout";
import NavigationMenu from "../components/NavigationMenu";
import NavigationBreadcrumbs from "../components/navigation/NavigationBreadcrumbs";

export const loader = async () => {
  return json({
    page: {
      title: 'Inventory',
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

function TableRow({ children }: PropsWithChildren) {
  return <tr className="bg-gray-100 even:bg-gray-200 dark:bg-gray-950 even:dark:bg-gray-900">
    {children}
  </tr>
}

function TableHeaderRow({ children }: PropsWithChildren) {
  return <tr className="bg-gray-50 dark:bg-gray-900">
    {children}
  </tr>
}

function TableCell({ children, width = '', wrap = false }: PropsWithChildren<{ width?: string | number, wrap?: boolean }>) {

  return (
    <td width={`${width}`} className={`${wrap ? '' : 'text-nowrap'} px-3 py-2`}>
      {children}
    </td>
  )
}

function Table({ children, widths }: PropsWithChildren<{ widths?: (number)[] }>) {
  const width = widths?.reduce((acc, cur) => acc + cur) ?? 100;

  return (
    <div className="overflow-x-auto">
      <table className="table-fixed">
        {children}
      </table>
    </div>
  )
}

function InventoryListTableCard() {
  const data = useLoaderData() as { [_: string]: any };

  return (
    <Card title={data?.page.title}>
      {Array.isArray(data?.['result']) ?
        <Table>
          <thead className="drop-shadow-sm">
            <TableHeaderRow>
              <TableCell width="1"><input type="checkbox" /></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Inventory</TableCell>
              <TableCell width="100%"></TableCell>
            </TableHeaderRow>
          </thead>
          <tbody>
            {data?.['result'].map(item => (
              <TableRow key={`inventory-list-row-${item.id}`}>
                <TableCell width="1"><input type="checkbox" /></TableCell>
                <TableCell><Link to={`./detail/${item.id}`}>{item.name}</Link></TableCell>
                <TableCell>{item.price.symbol ?? item.price.unit}{item.price.amount}</TableCell>
                <TableCell>{item.inventory.amount}</TableCell>
                <TableCell width="100%"></TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
        : <div className="w-full text-center px-3 py-2">No Data</div>
      }
    </Card>
  );
}

const Page = () => {
  return (<>
    <NavigationBreadcrumbs />,
    <ThreeColumnLayout
      left={<NavigationMenu items={[]} />}>
      <div className="p-6">
        <InventoryListTableCard />
      </div>
    </ThreeColumnLayout>
    </>);
}

export default { Page, loader };