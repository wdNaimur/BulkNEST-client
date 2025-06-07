import React, { useState } from "react";
import { useLoaderData } from "react-router";
import ProductCard from "../components/ProductCard";

const AllProductsPage = () => {
  const data = useLoaderData();
  const products = data?.data || [];

  console.log(data.data);
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="bg-base-100 p-10 rounded-box space-y-4 text-center mb-8">
        <h2 className="text-4xl font-bold text-primary">All Products</h2>
        <p className="opacity-70">Explore all available products.</p>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center items-center gap-5 w-full">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AllProductsPage;
