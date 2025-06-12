import React, { use, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../AuthContexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoaderDataFetch from "../UI/LoaderDataFetch";

const AllProductsPage = () => {
  useEffect(() => {
    document.title = "BulkNEST | All Products";
  }, []);
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [available, setAvailable] = useState(false);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    setProductsLoading(true);
    axiosSecure(`/products/${user.email}?available=${available}`)
      .then((data) => {
        setDisplayedProducts(data?.data);
        setLoading(false);
        setProductsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setProductsLoading(false);
      });
  }, [user.email, axiosSecure, available]);

  const handleAvailableProducts = () => {
    setAvailable(!available);
  };

  if (loading) {
    return <LoaderDataFetch />;
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="bg-base-100 p-10 rounded-box space-y-4 text-center mb-8">
        <h2 className="text-4xl font-bold text-primary">All Products</h2>
        <p className="opacity-70">Explore all available products.</p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <span>Show Available Products</span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={available}
          onChange={handleAvailableProducts}
        />
      </div>
      {productsLoading ? (
        <LoaderDataFetch />
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center items-center gap-5 w-full mt-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AllProductsPage;
