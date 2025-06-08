import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import LoaderDataFetch from "../UI/LoaderDataFetch";

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
  return <div>this is SingleCategoryPage : {category}</div>;
};

export default SingleCategoryPage;
