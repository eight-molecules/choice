import { json, useParams } from "react-router-dom";
import ThreeColumnLayout from "../components/shared/ThreeColumnLayout";
import NavigationMenu from "../components/NavigationMenu";
import Card from "../components/shared/Card/Card";


export const loader = async () => {
  return json({
    page: {
      title: 'Item 1',
    },
    result: { id: 1, name: 'Item 1', price: { amount: "37.00", unit: "USD", symbol: "$" }, inventory: { amount: "43" } }
  });
};

const Page = () => {
  const params = useParams();
  return (
    <ThreeColumnLayout
      left={<NavigationMenu items={[]} />}>
      <div className="p-6">
        <Card title={params.id ?? 'err'}>
            <p className="text-gray-700 dark:text-gray-100 text-base">
              A card with some content.
            </p>
        </Card>
      </div>
    </ThreeColumnLayout>
  );
}

export default { Page, loader };
