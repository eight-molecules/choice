import { json, redirect, RouteObject } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PageLayout from "./components/Layout/PageLayout";
import ProductList from "./pages/Product/ProductList";
import ProductCreate from "./pages/Product/ProductCreate";
import Product from "./pages/Product";
import ProductEdit from "./pages/Product/ProductEdit";
import ProductDetail from "./pages/Product/ProductDetail";

export const routes: RouteObject[] = [
  {
    path: "/",
    loader: async () => redirect('dashboard')
  }, {
    path: 'dashboard',
    element: <Dashboard.Page />,
    loader: Dashboard.loader,
  }, {
    path: 'product',
    element: <Product.Page />,
    loader: Product.loader,
    children: [
      {
        path: "",
        element: <ProductList.Page />,
        loader: ProductList.loader,
        children: [{
          path: "create",
          element: <ProductCreate.Modal />,
          loader: ProductCreate.loader
        }]
      },
      {
        path: ':id',
        loader: async ({ params }) => redirect(`../detail/${params.id}`),
      },
      {
        path: 'detail/:id',
        element: <ProductDetail.Page />,
        loader: ProductDetail.loader,
        children: [
          {
            path: 'edit',
            element: <ProductEdit.Modal />,
            loader: ProductEdit.loader
          }
        ]
      }
    ]
  },
  {
    path: 'Orders',
    element: <Dashboard.Page />,
  },
  {
    path: 'Customers',
    element: <Dashboard.Page />,
  },
  {
    path: 'Vendors',
    element: <Dashboard.Page />,
  },
  {
    path: '**',
    element: <div>how'd you get here?</div>,
    errorElement: <div>err, error.</div>
  }
];