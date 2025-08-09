import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { use } from "react";
import { motion, useInView } from "framer-motion";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddProductPage = () => {
  useEffect(() => {
    document.title = "BulkNEST | Add Product";
    window.scrollTo(0, 0);
  }, []);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  const navigate = useNavigate();
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

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

    axiosSecure
      .post(`/products/${user.email}`, productData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Product Added Successfully!");
          form.reset();
          navigate(`/myProduct`);
        } else {
          toast.error("Failed to add product.");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Server Error!");
      });
  };

  return (
    <div className="container mx-auto p-4">
      <motion.form
        ref={ref}
        initial={{ opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
            : { opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }
        }
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        onSubmit={handleAddProduct}
        className="bg-base-200 p-4 rounded-box space-y-6 shadow-lg shadow-primary/10 border border-primary/5"
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
      </motion.form>
    </div>
  );
};

export default AddProductPage;
