import React, { use, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../../context/AuthContext";
import LoaderDataFetch from "../../../components/common/LoaderDataFetch";
import ProductCard from "../../../components/products/ProductCard";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyProductPage = () => {
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    document.title = "BulkNEST | My Products";
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setLoading(true);
    axiosSecure(`/myProducts/${user?.email}`)
      .then((data) => {
        setProducts(data?.data);
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
      <div className="bg-base-100 p-10 rounded-box space-y-4 text-center mb-8">
        <h2 className="text-4xl font-bold text-primary">My Products</h2>
        <p className="opacity-70">Explore your added products.</p>
      </div>

      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center items-center gap-5 w-full">
        {products.length ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              setProducts={setProducts}
            />
          ))
        ) : (
          <div className="font-poppins col-span-full ">
            <div className="p-10 space-y-2 my-10 rounded-box bg-base-100">
              <h1 className="text-2xl font-medium text-center text-primary">
                No Products Added
              </h1>
              <p className="text-center mx-auto opacity-80 px-4">
                Your product shelf is empty for now. Add your first product and
                start selling today!
              </p>
              <div className="flex items-center justify-center p-3">
                <Link
                  to="/addProduct"
                  className="btn btn-primary text-base-200 "
                >
                  Add Your First Product
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyProductPage;
