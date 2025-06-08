import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import OrderTable from "../components/OrderTable";

const CartPage = () => {
  const initialOrder = useLoaderData();
  const [allOrder, setAllOrder] = useState(initialOrder.data);
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="bg-base-100 p-10 rounded-box space-y-4 text-center">
        <h2 className="text-4xl font-bold text-primary">My Cart</h2>
        <p className="opacity-70">products I have bought.</p>
      </div>
      {allOrder.length ? (
        <div className="overflow-x my-10">
          <table className="table table-auto bg-base-100">
            <thead>
              <tr>
                <th>Product</th>
                <th className="text-center">Buying Date</th>
                {/* hidden lg:table-cell */}
                <th className="text-center">Quantity</th>
                {/*hidden sm:table-cell */}
                <th className="text-center">Total Price</th>
                {/*hidden sm:table-cell */}
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {allOrder.map((order) => (
                <OrderTable
                  key={order._id}
                  order={order}
                  allOrder={allOrder}
                  setAllOrder={setAllOrder}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-10 space-y-2 my-10 rounded-box bg-base-100 flex flex-col items-center justify-center gap-4">
          <h1 className="text-5xl text-center text-primary">
            Oops! Not Bought any Product.
          </h1>
          <Link to="/allProduct" className="btn btn-primary text-white">
            Buy your First Product
          </Link>
        </div>
      )}
    </section>
  );
};

export default CartPage;
