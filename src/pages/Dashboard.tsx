import { Suspense } from "react";
import { Await, json, useLoaderData } from "react-router-dom";
import ThreeColumnLayout from "../components/Layout/ThreeColumnLayout";
import Card from "../components/shared/Card/Card";
import NavigationMenu from "../components/navigation/Menu/NavigationMenu";
import navigation from "../navigation";
import PageLayout from "../components/Layout/PageLayout";
import Header from "../components/Header";
import ProductList from "./Product/ProductList";
import { parse } from "../network/response";

export const loader = async () => ({
  page: Promise.resolve(json({ title: 'Dashboard' })).then(parse),
  product: ProductList.loader()
    .then(({ result }) => result)
});

const Page = () => {
  const data = useLoaderData();

  return (
    <PageLayout header={<Header />}>
      <ThreeColumnLayout
        left={<NavigationMenu items={navigation} />}>
        <div className="p-6 flex">
          <div className="w-96">
            <Suspense fallback={<Card>
              <Card.Header>{data?.['page']?.['title'] ?? 'Loading'}</Card.Header>
              <div className="w-60 mx-auto p-3">
                Loading data.
              </div>
            </Card>}>
              <Await
                resolve={data?.['product']}
                errorElement={<Card>
                  <Card.Header>Error</Card.Header>
                  <div className="w-60 mx-auto p-3">
                    Failed to load Product List data.
                  </div>
                </Card>}
              >
                {(data) => { 
                  return <ProductList.Card data={data} title="Products"></ProductList.Card>} }
              </Await>
            </Suspense>
          </div>
        </div>
      </ThreeColumnLayout>
    </PageLayout>
  );
}

export default { Page, loader };