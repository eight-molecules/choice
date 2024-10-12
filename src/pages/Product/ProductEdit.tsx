import { json, Link, Outlet, useLoaderData, useOutletContext, useParams } from "react-router-dom";
import Card from "../../components/shared/Card/Card";

const CardHeader = ({ title }) => (
  <div className="flex">
    <div className="flex-grow">
      {title}
    </div>
    <div>
      <Link to="..">
        <button>
          Close
        </button>
      </Link>
    </div>
  </div>
);

const Modal = () => {
  const data = useOutletContext() as { [_: string]: any };

  return (
    <div id="modal-edit-product" className="absolute top-0 bottom-0 left-0 right-0 flex">
      <div className="w-full h-full relative">
        <div className="mx-auto">
          <div className="p-20">
            <Card>
              <Card.Header><CardHeader title={data?.result.name} /></Card.Header>
              <div className="p-3 flex flex-wrap">
                <div className="grow p-3 min-w-80 w-full">
                  <label>Name: </label>
                  <span>{data.result.name}</span>
                </div>
                <div className="grow p-3 min-w-80 w-full">
                  <label>Inventory: </label>
                  <span>{data.result.inventory.amount}</span>
                </div>
                <div className="grow p-3 min-w-80 w-full">
                  <label>Description: </label>
                  <span>{data.result.description}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default {
  Modal,
  // loader
};
