import { json, redirect, RouteObject } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import InventoryDetail from "./pages/Product/ProductDetail";
import InventoryList from "./pages/Product/ProductList";
import PageLayout from "./components/Layout/PageLayout";
import ProductList from "./pages/Product/ProductList";
import ProductCreate from "./pages/Product/ProductCreate";
import Product from "./pages/Product";
import { children } from "cheerio/dist/commonjs/api/traversing";
import ProductEdit from "./pages/Product/ProductEdit";

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
    element: <PageLayout><Product.Page /></PageLayout>,
    loader: Product.loader,
    children: [
      {
        path: "",
        element: <ProductList.Page />,
        loader: ProductList.loader
      },
      {
        path: "create",
        element: <ProductCreate.Page />,
        loader: ProductCreate.loader
      },
      {
        path: ':id',
        loader: async ({ params }) => redirect(`../detail/${params.id}`),
      },
      { 
        path: 'detail/:id',
        element: <InventoryDetail.Page />,
        loader: InventoryDetail.loader,
        children: [
          {
            path: 'edit',
            element: <ProductEdit.Modal />,
            loader: async () => json({ page: { title: 'Edit' } })
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