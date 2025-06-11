import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../AuthContexts/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoaderDataFetch from "../UI/LoaderDataFetch";

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

  useEffect(() => {
    setLoading(true);
    axiosSecure(`/product/${params.id}?email=${user?.email}`)
      .then((data) => {
        const productData = data.data;
        setProduct(productData);
        setStock(productData.main_quantity);
        setQuantity(productData.min_sell_quantity);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch product", err);
        setLoading(false);
      });
  }, [axiosSecure, params.id, user?.email]);

  useEffect(() => {
    if (product) {
      document.title = `BulkNEST | ${product.name}`;
    }
  }, [product]);

  const handleChangeQuantity = (val) => {
    if (!product) return;
    const min = product.min_sell_quantity;
    const max = stock;

    if (val >= min && val <= max) {
      setDirection(val > quantity ? "up" : "down");
      setQuantity(val);
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
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
        if (res.data.success) {
          setStock((prev) => prev - quantity);
          toast.success("Order Placed Successfully");
          navigate("/cart");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to Place Order");
      });

    form.reset();
    setQuantity(product.min_sell_quantity);
    document.getElementById("my_modal_2").close();
  };

  if (loading || !product) {
    return <LoaderDataFetch />;
  }

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
    <div className="container px-4 mx-auto mt-10">
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
              <button
                onClick={() => handleChangeQuantity(quantity - 1)}
                disabled={quantity <= min_sell_quantity}
                className="btn btn-sm btn-circle text-xl btn-primary"
              >
                –
              </button>

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

              <button
                onClick={() => handleChangeQuantity(quantity + 1)}
                disabled={quantity >= stock}
                className="btn btn-sm btn-circle text-xl btn-primary"
              >
                +
              </button>
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
    </div>
  );
};

export default ProductDetailsPage;
