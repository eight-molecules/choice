import { json, Link, Outlet, useLoaderData, useLocation, useMatches, useParams } from "react-router-dom";
import Card from "../../components/shared/Card/Card";

export const loader = async ({ params }) => {
  console.log(params);
  return json({
    page: {
      title: 'Item 1',
    },
    result: { 
      id: 1, 
      price: { amount: "37.00", unit: "USD", symbol: "$" }, 
      inventory: { amount: "43" },
      name: 'MAC Subcritical',
      description: ''
    }
  });
};


const CardHeader = ({ title }) => (
  <div className="flex">
    <div className="flex-grow">
      {title}
    </div>
    <div>
      <Link to="./edit">
        <button>
          Edit
        </button>
      </Link>
    </div>
  </div>
);

const Page = () => {
  const data = { } = useLoaderData() as { [_: string]: any };
  const { state } = useLocation();
  const item = { ...state, ...data.result }

  return (<>
        <Card >
          <Card.Header><CardHeader title={item.name}/></Card.Header>
            <div className="p-3 flex flex-wrap">
              <div className="grow p-3 min-w-80 w-full">
              <label>Name: </label>
                <span>{item.name}</span>
              </div>
              <div className="grow p-3 min-w-80 w-full">
              <label>Inventory: </label>
                <span>{item.inventory.amount}</span>
              </div>
              <div className="grow p-3 min-w-80 w-full">
              <label>Description: </label>
                <span>{item.description}</span>
              </div>
            </div>
        </Card>
        <Outlet context={data}/>
    </>
  );
}

export default { Page, loader };
