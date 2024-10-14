import { Await, NavLink, useMatches, useRouteLoaderData } from 'react-router-dom';
import { Fragment, Suspense } from 'react';

const NavigationBreadcrumb = ({ route }) => {
  const data = useRouteLoaderData(route.id);
  if (!data) {
    return <Fragment />;
  }

  return (
    <Suspense fallback={<li aria-current="page" key={`nav-breadcrumb-${route.id}`} className="flex items-center">
      <div className="flex items-center">
        <NavLink to={route.pathname}>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            '...'
          </span>
        </NavLink>
      </div>
    </li>}>
      <Await resolve={data?.['page']} errorElement={(
        <li aria-current="page" key={`nav-breadcrumb-${route.id}`} className="flex items-center">
          <div className="flex items-center">
            <NavLink to={route.pathname}>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                '...'
              </span>
            </NavLink>
          </div>
        </li>
      )}>{(data) => {
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
      <li key={`nav-breadcrumb-${route.id}}-spacer`} className='last:hidden'>{'→'}</li>
    </Suspense>);
};

const NavigationBreadcrumbs = () => {
  const matches = useMatches();
  const crumbs = matches.map(route => <NavigationBreadcrumb route={route} />)

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {crumbs}
      </ol>
    </nav>
  )
}

export default NavigationBreadcrumbs;