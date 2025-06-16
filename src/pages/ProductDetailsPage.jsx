import { useNavigate, useParams } from "react-router";
import React, { useContext, useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { AuthContext } from "../AuthContexts/AuthContext";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoaderDataFetch from "../UI/LoaderDataFetch";
import { Tooltip as ReactTooltip } from "react-tooltip";

const ProductDetailsPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [stock, setStock] = useState(0);
  const [direction, setDirection] = useState("up");
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosSecure(`/product/${params.id}?email=${user?.email}`)
      .then((data) => {
        const productData = data.data;
        setProduct(productData);
        setStock(productData?.main_quantity);
        setQuantity(productData?.min_sell_quantity);
        setLoading(false);
      })
      .catch((err) => {
        // toast.error("Failed to fetch product", err);
        setLoading(false);
      });
  }, [axiosSecure, params.id, user?.email]);

  useEffect(() => {
    if (product) {
      document.title = `BulkNEST | ${product.name}`;
      window.scrollTo(0, 0);
    } else {
      document.title = `BulkNEST | Details`;
      window.scrollTo(0, 0);
    }
  }, [product]);
  if (loading || orderLoading) {
    return <LoaderDataFetch />;
  }
  if (!product) {
    toast.error("This product doesn't exist.");
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
  const handleChangeQuantity = (val) => {
    const min = product.min_sell_quantity;
    const max = stock;

    if (val >= min && val <= max) {
      setDirection(val > quantity ? "up" : "down");
      setQuantity(val);
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderLoading(true);
    const form = e.target;
    const orderInfo = {
      productId: product._id,
      quantity,
      orderedFrom: user.email,
      buyerDetails: {
        buyerName: form.fullName.value,
        buyerEmail: form.email.value,
        buyerPhone: form.phone.value,
        buyerAddress: form.address.value,
      },
    };

    axiosSecure
      .post(`/orders/${user.email}`, orderInfo)
      .then((res) => {
        if (res?.data?.success) {
          setOrderLoading(false);
          setStock((prev) => prev - quantity);
          toast.success(res.data.message || "Order placed successfully");
          navigate("/cart");
        } else {
          setOrderLoading(false);
          toast.error(res.data.message || "Failed to place order.");
          navigate("/allProduct");
        }
      })
      .catch((err) => {
        setOrderLoading(false);
        const errorMsg =
          err.response?.data?.message || "Failed to place order.";
        toast.error(errorMsg);
        navigate("/allProduct");
      });

    form.reset();
    setQuantity(product.min_sell_quantity);
    document.getElementById("my_modal_2").close();
  };

  const {
    name,
    image,
    price,
    description,
    brand,
    category,
    min_sell_quantity,
  } = product;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="container px-4 mx-auto my-10"
    >
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 text-primary">
        {/* Product Image */}
        <div className="md:justify-self-end justify-self-center w-full max-w-lg">
          <div className="relative w-full aspect-[1] mx-auto">
            <div className="absolute inset-0 z-0 flex">
              <div className="w-1/2 bg-base-200"></div>
              <div className="w-1/2 bg-primary"></div>
            </div>
            <img
              src={image}
              alt={name}
              className="absolute inset-0 z-10 w-4/5 h-4/5 object-cover mx-auto my-auto top-[10%] left-[10%] right-[10%] bottom-[10%]"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <span className="inline-block px-3 py-1 text-sm bg-secondary/10 text-secondary rounded-full font-semibold mb-2 uppercase">
            {category}
          </span>
          <h1 className="text-3xl font-bold mb-2">{name}</h1>
          <p className="text-secondary/80 mb-3">{description}</p>
          <div className="text-2xl font-semibold text-secondary mb-6">
            ${price}
            <span className="text-sm text-primary ml-1">per unit</span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Details:</h2>
            <ul className="grid gap-3 text-secondary/80">
              <li className="flex items-center gap-2">
                <TiTick className="text-secondary" size={20} />
                Minimum Order: {min_sell_quantity}
              </li>
              <li className="flex items-center gap-2">
                <TiTick className="text-secondary" size={20} />
                Stock: <span className="text-primary font-medium">
                  {stock}
                </span>{" "}
                units
              </li>
              <li className="flex items-center gap-2">
                <TiTick className="text-secondary" size={20} />
                Brand: {brand}
              </li>
            </ul>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Select Quantity{" "}
              <span className="opacity-55 text-secondary">
                (minimum: {min_sell_quantity})
              </span>
            </h2>
            <div className="flex items-center gap-4">
              <div data-tooltip-id="decrease">
                <button
                  onClick={() => handleChangeQuantity(quantity - 1)}
                  disabled={quantity <= min_sell_quantity}
                  className="btn btn-sm btn-circle text-xl btn-primary"
                >
                  –
                </button>
                <ReactTooltip
                  id="decrease"
                  place="top-start"
                  content={`${
                    quantity <= min_sell_quantity ? "Minimum limit reached" : ""
                  }`}
                />
              </div>

              <div className="relative w-10 h-10 overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={quantity}
                    initial={{ y: direction === "up" ? -20 : 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: direction === "up" ? 20 : -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute text-xl font-semibold"
                  >
                    {quantity}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div data-tooltip-id="increase">
                <button
                  onClick={() => handleChangeQuantity(quantity + 1)}
                  disabled={quantity >= stock}
                  className="btn btn-sm btn-circle text-xl btn-primary"
                >
                  +
                </button>
                <ReactTooltip
                  id="increase"
                  place="top-start"
                  content={`${
                    quantity >= stock ? "Maximum stock reached" : ""
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Buy Button */}
          <div className="mt-4">
            <button
              className={`btn btn-primary ${
                stock < min_sell_quantity
                  ? "text-secondary-100"
                  : "text-base-100"
              }`}
              disabled={stock < min_sell_quantity}
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              {stock < min_sell_quantity ? "Not Available" : "Buy Now"}
            </button>

            {/* Modal */}
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <h3 className="font-bold text-lg pb-2 text-center border-dashed border-b-2 border-primary/40">
                    Your Product
                  </h3>
                  <p className="font-medium">
                    Product Name :{" "}
                    <span className="text-secondary">{product.name}</span>
                  </p>
                  <div className="font-medium flex items-center gap-3">
                    Quantity :{/* Button for + and - */}
                    <div className="flex items-center gap-4">
                      <span data-tooltip-id="decrease-checkout">
                        <button
                          type="button"
                          onClick={() => handleChangeQuantity(quantity - 1)}
                          disabled={quantity <= min_sell_quantity}
                          className={`btn btn-sm btn-circle text-xl btn-primary ${
                            quantity <= min_sell_quantity ? "btn-disabled" : ""
                          }`}
                        >
                          –
                        </button>
                        <ReactTooltip
                          id="decrease-checkout"
                          place="top-start"
                          content={`${
                            quantity <= min_sell_quantity
                              ? "Minimum limit reached"
                              : ""
                          }`}
                        />
                      </span>

                      <div className="relative w-10 h-10 overflow-hidden flex items-center justify-center">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={quantity}
                            initial={{
                              y: direction === "up" ? -20 : 20,
                              opacity: 0,
                            }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{
                              y: direction === "up" ? 20 : -20,
                              opacity: 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="absolute text-xl font-semibold"
                          >
                            {quantity}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <span data-tooltip-id="increase-checkout">
                        <button
                          type="button"
                          onClick={() => handleChangeQuantity(quantity + 1)}
                          disabled={quantity >= stock}
                          className={`btn btn-sm btn-circle text-xl btn-primary ${
                            quantity >= stock ? "btn-disabled" : ""
                          }`}
                        >
                          +
                        </button>
                        <ReactTooltip
                          id="increase-checkout"
                          place="top-start"
                          content={`${
                            quantity >= stock ? "Maximum stock reached" : ""
                          }`}
                        />
                      </span>
                    </div>
                  </div>
                  <p className="font-medium">
                    Total Price :{" "}
                    <span className="text-secondary">
                      {quantity * product.price}$
                    </span>
                  </p>
                  <h3 className="font-bold text-lg pb-2 text-center border-dashed border-b-2 border-primary/40">
                    Checkout
                  </h3>
                  <div className="form-control w-full">
                    <label className="label text-secondary mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      defaultValue={user.displayName}
                      readOnly={true}
                      className="input border-none bg-primary/10 w-full focus:outline-primary/40"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label text-secondary mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      defaultValue={user.email}
                      readOnly={true}
                      className="input border-none bg-primary/10 w-full focus:outline-primary/40"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label text-secondary mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="input border-none bg-primary/10 w-full focus:outline-primary/40"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label text-secondary mb-1">
                      Shipping Address
                    </label>
                    <textarea
                      name="address"
                      required
                      className="textarea border-none bg-primary/10 w-full focus:outline-primary/40"
                      rows={3}
                      placeholder="Enter your shipping address"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary text-base-100 w-full"
                  >
                    Place Order
                  </button>
                </form>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>Close</button>
              </form>
            </dialog>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailsPage;
