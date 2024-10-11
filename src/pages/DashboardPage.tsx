import { PropsWithChildren } from "react";
import { json, useLoaderData } from "react-router-dom";
import ThreeColumnLayout from "../components/shared/ThreeColumnLayout";
import Card from "../components/shared/Card/Card";

export const loader = async () => {
  return json([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' },
    { id: 6, name: 'Item 6' },
    { id: 7, name: 'Item 7' },
  ]);
};

function ListTableItem({ key, children }: PropsWithChildren<{ key: string }>) {
  return <li key={`item-${key}`} className="bg-gray-950 even:bg-gray-900">
    {children}
  </li>
}
const DashboardPage = () => {
  const data = useLoaderData();

  return (
    <ThreeColumnLayout
      left={null/* <NavigationMenu items={navigation} /> */}>
        <div className="p-6">
          <Card title="Dashboard">
            { Array.isArray(data) ? 
              <ul className="">
                {data.map((item, index) => (
                  <ListTableItem key={`item-${item.id}`}>
                      <ul className="flex">
                        <li className="inline px-3 py-2 border-gray-300 dark:border-gray-800 border-l first:border-l-0"><input type="checkbox" /></li>
                        <li className="inline px-3 py-2 border-gray-300 dark:border-gray-800 border-l first:border-l-0">{item.name}</li>
                      </ul>
                  </ListTableItem>
                ))}
              </ul>
              : 'No Data'
            }
          </Card>
        </div>
    </ThreeColumnLayout>
  );
}

export default DashboardPage;