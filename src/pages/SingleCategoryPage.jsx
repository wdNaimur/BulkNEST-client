import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import LoaderDataFetch from "../UI/LoaderDataFetch";
import ProductCard from "../components/ProductCard";

const SingleCategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState(null);
  useEffect(() => {
    document.title = "BulkNEST | Update Product";
    fetch(`${import.meta.env.VITE_API_URL}/products/${category}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => toast.error("Failed to fetch product data"));
  }, [category]);
  console.log(category, products);
  if (!products) return <LoaderDataFetch />;
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
        <div>no product found</div>
      )}
    </section>
  );
};

export default SingleCategoryPage;
