import React, { useEffect, useState, useContext } from "react";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../AuthContexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoaderDataFetch from "../UI/LoaderDataFetch";
import ProductTable from "../components/ProductTable";

const AllProductsPage = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [available, setAvailable] = useState(false);
  const [selectedOption, setSelectedOption] = useState("card");

  useEffect(() => {
    document.title = "BulkNEST | All Products";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!user?.email) return;
    setProductsLoading(true);
    axiosSecure(`/products/${user.email}?available=${available}`)
      .then((res) => {
        setDisplayedProducts(res?.data || []);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })
      .finally(() => {
        setLoading(false);
        setProductsLoading(false);
      });
  }, [user?.email, axiosSecure, available]);

  const handleAvailableToggle = () => {
    setAvailable((prev) => !prev);
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

      {/* Filters */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span>Show Available Products</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={available}
            onChange={handleAvailableToggle}
          />
        </div>

        <div className="w-fit">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="select select-sm select-primary w-full text-primary font-semibold"
          >
            <option value="card">Card</option>
            <option value="list">List</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      {productsLoading ? (
        <LoaderDataFetch />
      ) : selectedOption === "card" ? (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
          {displayedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-box">
          <div className="overflow-x-scroll my-10">
            <table className="table table-auto bg-base-100">
              <thead>
                <tr>
                  <th className="ps-20">Product</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Rating</th>
                  <th className="text-center">Stock</th>
                  <th className="text-center">Min Order</th>
                  <th className="text-center">View</th>
                </tr>
              </thead>
              <tbody>
                {displayedProducts.map((product, index) => (
                  <ProductTable
                    key={product._id}
                    product={product}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default AllProductsPage;
