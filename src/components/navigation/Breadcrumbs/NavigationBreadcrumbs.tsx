import { NavLink, useMatches, useRouteLoaderData } from 'react-router-dom';

const NavigationBreadcrumb = ({ route }) => {
  const data = useRouteLoaderData(route.id);

  return (data?.['page'] &&
    <li aria-current="page" key={`nav-breadcrumb-${route.id}`} className="flex items-center">
      <div className="flex items-center">
        <NavLink to={route.pathname}>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {data?.['page']?.['title']}
          </span>
        </NavLink>
      </div>
    </li>);
};

const NavigationBreadcrumbs = () => {
  const matches = useMatches();
  const crumbs = matches.map(route => [
    <NavigationBreadcrumb route={route} />, 
    <li>{'→'}</li>
  ]).flat().slice(0, (matches.length * 2) - 1);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {crumbs}
      </ol>
    </nav>
  )
}

export default NavigationBreadcrumbs;