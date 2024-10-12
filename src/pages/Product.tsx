import Header from "../components/Header";
import PageLayout from "../components/Layout/PageLayout";
import ThreeColumnLayout from "../components/Layout/ThreeColumnLayout";
import NavigationMenu from "../components/navigation/Menu/NavigationMenu";
import navigation from "../navigation";
import { json, Outlet, OutletProps } from "react-router-dom";

const loader = () => json({ page: { title: 'Product' }});
const Page = () => {
  return (
    <PageLayout header={<Header />}>
      <ThreeColumnLayout
        left={<NavigationMenu items={navigation} />}>
        <div className="p-6">
          <Outlet />
        </div>
      </ThreeColumnLayout>
    </PageLayout>);
}

export default { Page, loader };