import React, { use, useEffect, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence } from "framer-motion";
import { AuthContext } from "../../../context/AuthContext";
import LoaderDataFetch from "../../../components/common/LoaderDataFetch";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SellerOrderTable from "../../../components/orders/SellerOrderTable";

const SellerOrdersPage = () => {
  useEffect(() => {
    document.title = "BulkNEST | My Orders";
    window.scrollTo(0, 0);
  }, []);

  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(true);
  const [sellerOrders, setSellerOrders] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Fetch all orders for products that belong to this seller
  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    axiosSecure(`/seller-orders/${user.email}`)
      .then((res) => {
        setSellerOrders(res?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user.email, axiosSecure]);
  console.log(sellerOrders);
  if (loading) {
    return <LoaderDataFetch />;
  }

  return (
    <section className="container mx-auto p-4">
      {sellerOrders.length ? (
        <>
          <div className="mx-auto shadow-xl shadow-primary/5 overflow-auto rounded-box">
            <table className="table table-auto  bg-base-200 rounded-box overflow-hidden">
              <thead className="bg-primary text-white">
                <tr>
                  <th>#</th>
                  <th>Buyer</th>
                  <th className="text-center">Contact Info</th>
                  <th className="text-center">Product</th>
                  <th className="text-center">Order Date</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Total Price</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {sellerOrders.map((order, index) => (
                    <SellerOrderTable
                      key={order._id}
                      order={order}
                      setSellerOrders={setSellerOrders}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="font-poppins col-span-full ">
          <div className="p-10 space-y-2 my-10 rounded-box bg-base-100">
            <h1 className="text-2xl font-medium text-center text-primary">
              No Orders Yet
            </h1>
            <p className="text-center mx-auto opacity-80 px-4">
              You haven’t received any orders yet. Keep promoting your products
              and check back here for updates!
            </p>
            <div className="flex items-center justify-center p-3">
              <Link to="/my-products" className="btn btn-primary text-base-200">
                View My Products
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SellerOrdersPage;
