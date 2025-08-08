import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/AuthContext";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    document.title = "BulkNEST | Update Product";
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setLoading(true);
    axiosSecure(`/product/${id}?email=${user?.email}`)
      .then((data) => {
        setProduct(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("This product doesn't exist.");
        setLoading(false);
      });
  }, [id, axiosSecure, user.email]);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedData = Object.fromEntries(formData.entries());

    updatedData.price = parseFloat(updatedData.price);
    updatedData.main_quantity = parseInt(updatedData.main_quantity);
    updatedData.min_sell_quantity = parseInt(updatedData.min_sell_quantity);
    updatedData.rating = parseInt(updatedData.rating);
    updatedData.userEmail = product.userEmail;
    axiosSecure
      .patch(`/product/${id}?email=${user?.email}`, updatedData)
      .then((data) => {
        if (data?.data?.modifiedCount > 0) {
          toast.success("Product Updated Successfully!");
          navigate(`/product/${id}`);
        } else {
          toast.error("No changes made or failed to update.");
        }
      })
      .catch(() => toast.error("Server Error!"));
  };
  if (loading) {
    return <LoaderDataFetch />;
  }
  if (!product) {
    return (
      <div className="container mx-auto px-4 font-poppins">
        <div className="p-10 space-y-2 my-10 rounded-box bg-base-100">
          <h1 className="text-2xl font-medium text-center text-primary">
            Product Not Found
          </h1>
          <p className="text-center  mx-auto opacity-80 px-4">
            The product you are looking for does not exist or may have been
            removed. Please check the URL or return to the product listing to
            browse available items.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-base-100 p-10 rounded-box space-y-4 text-center">
        <h2 className="text-4xl font-bold text-primary">Update Product</h2>
        <p className="opacity-70">Update the product details below.</p>
      </div>
      <motion.form
        initial={{ opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        onSubmit={handleUpdateProduct}
        className="bg-base-100 p-8 rounded-box mt-8 space-y-6 shadow-md shadow-primary/5"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="form-control w-full">
            <label className="label text-secondary mb-1">Image URL</label>
            <input
              name="image"
              type="url"
              defaultValue={product.image}
              className="input border-none bg-primary/10 w-full focus:outline-primary/40"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label text-secondary mb-1">Product Name</label>
            <input
              name="name"
              type="text"
              defaultValue={product.name}
              className="input border-none bg-primary/10 w-full focus:outline-primary/40"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label text-secondary mb-1">Main Quantity</label>
            <input
              name="main_quantity"
              type="number"
              defaultValue={product.main_quantity}
              className="input border-none bg-primary/10 w-full focus:outline-primary/40"
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
              defaultValue={product.min_sell_quantity}
              className="input border-none bg-primary/10 w-full focus:outline-primary/40"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label text-secondary mb-1">Brand Name</label>
            <input
              name="brand"
              type="text"
              defaultValue={product.brand}
              className="input border-none bg-primary/10 w-full focus:outline-primary/40"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label text-secondary mb-1">Category</label>
            <select
              name="category"
              defaultValue={product.category}
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
              defaultValue={product.price}
              className="input border-none bg-primary/10 w-full focus:outline-primary/40"
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
              defaultValue={product.rating}
              className="input border-none bg-primary/10 w-full focus:outline-primary/40"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label text-secondary mb-1">Short Description</label>
          <textarea
            name="description"
            defaultValue={product.description}
            className="textarea border-none bg-primary/10 w-full focus:outline-primary/40 resize-none"
            required
          ></textarea>
        </div>

        <button className="btn btn-primary w-full mt-4 text-base-100">
          Update Product
        </button>
      </motion.form>
    </div>
  );
};

export default UpdateProductPage;
