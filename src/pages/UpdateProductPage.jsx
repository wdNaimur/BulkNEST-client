import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../AuthContexts/AuthContext";
import LoaderDataFetch from "../UI/LoaderDataFetch";

const UpdateProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    document.title = "BulkNEST | Update Product";
    fetch(`${import.meta.env.VITE_API_URL}/product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => toast.error("Failed to fetch product data"));
  }, [id]);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedData = Object.fromEntries(formData.entries());

    updatedData.price = parseFloat(updatedData.price);
    updatedData.main_quantity = parseInt(updatedData.main_quantity);
    updatedData.min_sell_quantity = parseInt(updatedData.min_sell_quantity);
    updatedData.rating = parseInt(updatedData.rating);
    updatedData.userEmail = user.email;
    console.log(updatedData);

    fetch(`${import.meta.env.VITE_API_URL}/product/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Product Updated Successfully!");
          navigate(`/myProduct`);
        } else {
          toast.error("No changes made or failed to update.");
        }
      })
      .catch(() => toast.error("Server Error!"));
  };

  if (!product) return <LoaderDataFetch />;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-base-100 p-10 rounded-box space-y-4 text-center">
        <h2 className="text-4xl font-bold text-primary">Update Product</h2>
        <p className="opacity-70">Update the product details below.</p>
      </div>
      <form
        onSubmit={handleUpdateProduct}
        className="bg-base-100 p-8 rounded-box mt-8 space-y-6 shadow-md"
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
      </form>
    </div>
  );
};

export default UpdateProductPage;
