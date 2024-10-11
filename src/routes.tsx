import { redirect } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Inventory from "./pages/Inventory";
import InventoryDetail from "./pages/InventoryDetail";

export const routes = [
  {
    path: "/",
    loader: () => redirect('dashboard')
  }, {
    path: 'dashboard',
    element: <DashboardPage />,
  }, {
    path: 'inventory',
    children: [
      {
        path: '',
        element: <Inventory.Page />,
        loader: Inventory.loader,
      },
      {
        path: ':id',
        loader: ({ params }) => redirect(`../detail/${params.id}`),
      },
      { 
        path: 'detail/:id',
        element: <InventoryDetail.Page />,
        loader: InventoryDetail.loader
      }
    ]
  },
];