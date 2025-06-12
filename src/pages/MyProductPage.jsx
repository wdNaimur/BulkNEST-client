import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../AuthContexts/AuthContext";
import LoaderDataFetch from "../UI/LoaderDataFetch";
import ProductCard from "../components/ProductCard";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyProductPage = () => {
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    document.title = "BulkNEST | My Products";
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
  console.log(products);
  if (loading) {
    return <LoaderDataFetch />;
  }
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="bg-base-100 p-10 rounded-box space-y-4 text-center mb-8">
        <h2 className="text-4xl font-bold text-primary">My Products</h2>
        <p className="opacity-70">Explore your added products.</p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center items-center gap-5 w-full">
        {products.length ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div>No Products</div>
        )}
        {}
      </div>
    </section>
  );
};

export default MyProductPage;
