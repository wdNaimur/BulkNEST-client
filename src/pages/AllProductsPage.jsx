import React, { use, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../AuthContexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoaderDataFetch from "../UI/LoaderDataFetch";

const AllProductsPage = () => {
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [available, setAvailable] = useState(false);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    setLoading(true);
    axiosSecure(`/products/${user.email}`)
      .then((data) => {
        setAllProducts(data?.data);
        setDisplayedProducts(data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.email, axiosSecure]);

  const handleAvailableProducts = () => {
    const newAvailable = !available;
    setAvailable(newAvailable);

    if (newAvailable) {
      const filteredProducts = allProducts.filter(
        (product) => product.main_quantity - product.min_sell_quantity >= 100
      );
      setDisplayedProducts(filteredProducts);
    } else {
      setDisplayedProducts(allProducts);
    }
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

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center items-center gap-5 w-full mt-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AllProductsPage;
