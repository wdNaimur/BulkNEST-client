import React, { use, useEffect, useState } from "react";
import { Link } from "react-router";
import OrderTable from "../components/OrderTable";
import { AuthContext } from "../AuthContexts/AuthContext";
import LoaderDataFetch from "../UI/LoaderDataFetch";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AnimatePresence } from "framer-motion";

const CartPage = () => {
  useEffect(() => {
    document.title = "BulkNEST | My Cart";
    window.scrollTo(0, 0);
  }, []);
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(true);
  const [allOrder, setAllOrder] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    setLoading(true);
    axiosSecure(`/orders/${user.email}`)
      .then((data) => {
        setAllOrder(data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user.email, axiosSecure]);
  if (loading) {
    return <LoaderDataFetch />;
  }
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="bg-base-100 p-10 rounded-box space-y-4 text-center">
        <h2 className="text-4xl font-bold text-primary">My Cart</h2>
        <p className="opacity-70">products I have bought.</p>
      </div>
      {allOrder.length ? (
        <div className="overflow-x-scroll rounded-box my-10">
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
              <AnimatePresence>
                {allOrder.map((order, index) => (
                  <OrderTable
                    key={order._id}
                    order={order}
                    allOrder={allOrder}
                    setAllOrder={setAllOrder}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="font-poppins col-span-full ">
          <div className="p-10 space-y-2 my-10 rounded-box bg-base-100">
            <h1 className="text-2xl font-medium text-center text-primary">
              Your Cart is Empty
            </h1>
            <p className="text-center mx-auto opacity-80 px-4">
              Looks like you haven’t added anything to your cart yet. Start
              exploring our products and fill it up!
            </p>
            <div className="flex items-center justify-center p-3">
              <Link to="/allProduct" className="btn btn-primary text-base-200 ">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;
