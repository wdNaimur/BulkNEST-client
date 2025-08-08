import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router";
import LoaderDataFetch from "../../components/common/LoaderDataFetch";
import ProductCard from "../../components/products/ProductCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../context/AuthContext";

const SingleCategoryPage = () => {
  const { category } = useParams();
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setLoading(true);
    axiosSecure(`/categories/${category}?email=${user?.email}`)
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch product", err);
        setLoading(false);
      });
  }, [axiosSecure, category, user?.email]);
  if (loading) {
    return <LoaderDataFetch />;
  }
  if (!loading && Array.isArray(products) && !products.length) {
    toast.error("No Product in this category");
    return (
      <div className="font-poppins col-span-full container mx-auto px-4">
        <div className="bg-base-100 p-10 rounded-box space-y-4 text-center mt-10">
          <h2 className="text-4xl font-bold text-primary">{category}</h2>
          <p className="opacity-70">Explore {category} products.</p>
        </div>
        <div className="p-10 space-y-2 my-10 rounded-box bg-base-100">
          <h1 className="text-2xl font-medium text-center text-primary">
            No Products Available
          </h1>
          <p className="text-center mx-auto opacity-80 px-4">
            There are currently no products in this category. Please check back
            later or explore other categories.
          </p>
          <div className="flex items-center justify-center p-3">
            <Link to="/categories" className="btn btn-primary text-base-200 ">
              Explore All Categories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="bg-base-100 p-10 rounded-box space-y-4 text-center mb-8">
        <h2 className="text-4xl font-bold text-primary">{category}</h2>
        <p className="opacity-70">Explore {category} products.</p>
      </div>
      {products?.length ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center items-center gap-5 w-full">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center pt-10">no product found</div>
      )}
    </section>
  );
};

export default SingleCategoryPage;
