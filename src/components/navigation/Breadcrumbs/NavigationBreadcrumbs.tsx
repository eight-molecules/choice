import { Await, NavLink, useMatches, useRouteLoaderData } from 'react-router-dom';
import { parse } from '../../../network/response';
import { Suspense } from 'react';

const NavigationBreadcrumb = ({ route }) => {
  const data = useRouteLoaderData(route.id);

  return (
    <Suspense fallback={<></>}>
    <Await resolve={data?.['page']}>{(data) => {
      console.log(data)
    return (
    <li aria-current="page" key={`nav-breadcrumb-${route.id}`} className="flex items-center">
      <div className="flex items-center">
        <NavLink to={route.pathname}>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {data?.title}
          </span>
        </NavLink>
      </div>
    </li>
    )
    }}
    </Await>
    </Suspense>
  );
};

const NavigationBreadcrumbs = () => {
  const matches = useMatches();
  console.log(matches);
  const crumbs = matches.map(route => [
    <NavigationBreadcrumb route={route} />, 
    <li key={`nav-breadcrumb-${route.id}-spacer`}>{'→'}</li>
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