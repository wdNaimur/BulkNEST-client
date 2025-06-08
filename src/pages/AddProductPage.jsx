import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { use } from "react";
import { AuthContext } from "../AuthContexts/AuthContext";

const AddProductPage = () => {
  const navigate = useNavigate();
  const { user } = use(AuthContext);

  useEffect(() => {
    document.title = "BulkNEST | Add Product";
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const productData = Object.fromEntries(formData.entries());

    productData.price = parseFloat(productData.price);
    productData.main_quantity = parseInt(productData.main_quantity);
    productData.min_sell_quantity = parseInt(productData.min_sell_quantity);
    productData.rating = parseInt(productData.rating);
    productData.userEmail = user.email;
    productData.review = [];

    fetch(`${import.meta.env.VITE_API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Product Added Successfully!");
          //LaterTask
          // form.reset();
          // navigate("/dashboard/my-products");
        } else {
          toast.error("Failed to add product.");
        }
      })
      .catch(() => toast.error("Server Error!"));
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-base-100 p-10 rounded-box space-y-4 text-center">
        <h2 className="text-4xl font-bold text-primary">Add Product</h2>
        <p className="opacity-70">Fill in the product details below.</p>
      </div>
      <form
        onSubmit={handleAddProduct}
        className="bg-base-100 p-8 rounded-box mt-8 space-y-6 shadow-md"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="form-control w-full">
            <label className="label text-secondary mb-1">Image URL</label>
            <input
              name="image"
              type="url"
              className="input border-none bg-primary/10 w-full focus:outline-primary/40"
              placeholder="e.g., https://example.com/product.jpg"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label text-secondary mb-1">Product Name</label>
            <input
              name="name"
              type="text"
              className="input border-none bg-primary/10 w-full focus:outline-primary/40"
              placeholder="e.g., Wireless Mouse"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label text-secondary mb-1">Main Quantity</label>
            <input
              name="main_quantity"
              type="number"
              className="input border-none bg-primary/10 w-full focus:outline-primary/40"
              placeholder="e.g., 500"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label text-secondary mb-1">
              Minimum Selling Quantity
            </label>
            <input
              name="min_sell_quantity"
              type="number"
              className="input border-none bg-primary/10 w-full focus:outline-primary/40"
              placeholder="e.g., 50"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label text-secondary mb-1">Brand Name</label>
            <input
              name="brand"
              type="text"
              className="input border-none bg-primary/10 w-full focus:outline-primary/40"
              placeholder="e.g., Logitech"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label text-secondary mb-1">Category</label>
            <select
              name="category"
              className="select border-none bg-base-100 w-full focus:outline-primary/40"
              required
            >
              <option value="">Select Category</option>
              <option>Electronics & Gadgets</option>
              <option>Home & Kitchen Appliances</option>
              <option>Fashion & Apparel</option>
              <option>Industrial Machinery & Tools</option>
              <option>Health & Beauty</option>
              <option>Automotive Parts & Accessories</option>
              <option>Office Supplies & Stationery</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label text-secondary mb-1">
              Price (per unit)
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              className="input border-none bg-primary/10 w-full focus:outline-primary/40"
              placeholder="e.g., 24.99"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label text-secondary mb-1">Rating (1-5)</label>
            <input
              name="rating"
              type="number"
              min="1"
              max="5"
              className="input border-none bg-primary/10 w-full focus:outline-primary/40"
              placeholder="e.g., 4"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label text-secondary mb-1">Short Description</label>
          <textarea
            name="description"
            className="textarea border-none bg-primary/10 w-full focus:outline-primary/40 resize-none"
            placeholder="e.g., A lightweight, ergonomic wireless mouse with USB receiver..."
            required
          ></textarea>
        </div>

        <button className="btn btn-primary w-full mt-4 text-base-100">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
