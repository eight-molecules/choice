import { Link } from "react-router-dom";
import ThreeColumnLayout from "./Layout/ThreeColumnLayout";
import NavigationBreadcrumbs from "./navigation/Breadcrumbs/NavigationBreadcrumbs";

const Header = () => {
  return (
    <header className="sticky top-0 bg-gray-50 dark:bg-gray-800 shadow-md z-10 p-4">
      <ThreeColumnLayout left={<Link to="/"><h1 className="px-6">App!</h1></Link>}>
        <NavigationBreadcrumbs />
      </ThreeColumnLayout>
    </header>
  );
}

export default Header;