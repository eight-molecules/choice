import { PropsWithChildren, Suspense } from "react";
import { Await, defer, json, useLoaderData, useRouteError } from "react-router-dom";
import ThreeColumnLayout from "../components/Layout/ThreeColumnLayout";
import Card from "../components/shared/Card/Card";
import NavigationMenu from "../components/navigation/Menu/NavigationMenu";
import navigation from "../navigation";
import NavigationBreadcrumbs from "../components/navigation/Breadcrumbs/NavigationBreadcrumbs";
import PageLayout from "../components/Layout/PageLayout";
import Header from "../components/Header";
import ProductList from "./Product/ProductList";

export const loader = async () => ({
  page:{ title: 'Dashboard' },
  product: ProductList.loader().then(async (r: Response) => {
    if (r.body instanceof ReadableStream) {
      const result = JSON.parse(await r.text());
      return result;
    }

    return Promise.reject('failure');
  })
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
            children={({ result } = { }) => <ProductList.Card  data={result} title="Products"></ProductList.Card>}
            />
            </Suspense>
            </div>
        </div>
      </ThreeColumnLayout>
    </PageLayout>
  );
}

export default { Page, loader };