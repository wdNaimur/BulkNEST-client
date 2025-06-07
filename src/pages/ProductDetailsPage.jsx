import { useLoaderData } from "react-router";
import { use, useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../AuthContexts/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const ProductDetailsPage = () => {
  const data = useLoaderData();
  const { user } = use(AuthContext);
  const product = data.data;

  const minimumQuantity = product.min_sell_quantity;
  const initialStock = product.main_quantity;

  const [quantity, setQuantity] = useState(minimumQuantity);
  const [stock, setStock] = useState(initialStock);
  const [direction, setDirection] = useState("up");

  useEffect(() => {
    document.title = `BulkNEST | ${product?.name || "Product Details"}`;
  }, [product]);

  const handleChangeQuantity = (val) => {
    if (val >= minimumQuantity && val <= stock) {
      setDirection(val > quantity ? "up" : "down");
      setQuantity(val);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const buyerName = form.fullName.value;
    const buyerEmail = form.email.value;
    const buyerPhone = form.phone.value;
    const buyerAddress = form.address.value;
    const orderedFrom = user.email;
    const orderInfo = {
      productId: product._id,
      quantity,
      buyerDetails: {
        buyerName,
        buyerEmail,
        buyerPhone,
        buyerAddress,
        orderedFrom,
      },
    };
    // send data to backend && update data in backend of stock && Stock Minus
    axios
      .post(`${import.meta.env.VITE_API_URL}/orders`, orderInfo)
      .then((res) => {
        console.log(res.data);
        setStock((prev) => prev - quantity);
        toast.success("Order Placed Successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to Place Order");
      });

    form.reset();
    setQuantity(minimumQuantity);
    // Close modal
    document.getElementById("my_modal_2").close();
  };

  return (
    <div className="container px-4 mx-auto mt-10">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 text-primary">
        {/* Product Image */}
        <div className="md:justify-self-end justify-self-center w-full max-w-lg">
          <div className="relative w-full aspect-[1] mx-auto">
            {/* Background Split */}
            <div className="absolute inset-0 z-0 flex">
              <div className="w-1/2 bg-base-200"></div>
              <div className="w-1/2 bg-primary"></div>
            </div>

            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 z-10 w-4/5 h-4/5 object-cover mx-auto my-auto top-[10%] left-[10%] right-[10%] bottom-[10%]"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <span className="inline-block px-3 py-1 text-sm bg-secondary/10 text-secondary rounded-full font-semibold mb-2 uppercase">
            {product.category}
          </span>

          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-secondary/80 mb-3">{product.description}</p>

          <div className="text-2xl font-semibold text-secondary mb-6">
            ${product.price}
            <span className="text-sm text-primary ml-1">per unit</span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Details:</h2>
            <ul className="grid gap-3 text-secondary/80">
              <li className="flex items-center gap-2">
                <TiTick className="text-secondary" size={20} />
                {product.productContent}
              </li>
              <li className="flex items-center gap-2">
                <TiTick className="text-secondary" size={20} />
                Minimum Order: {minimumQuantity}
              </li>
              <li className="flex items-center gap-2">
                <TiTick className="text-secondary" size={20} />
                Stock:
                <span className="text-primary font-medium">{stock}</span>
                units
              </li>
              <li className="flex items-center gap-2">
                <TiTick className="text-secondary" size={20} />
                Brand: {product.brand}
              </li>
            </ul>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Select Quantity{" "}
              <span className="opacity-55 text-secondary">
                (minimum: {minimumQuantity})
              </span>
            </h2>
            {/* Quantity Button  */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleChangeQuantity(quantity - 1)}
                disabled={quantity <= minimumQuantity}
                className={`btn btn-sm btn-circle text-xl btn-primary ${
                  quantity <= minimumQuantity ? "btn-disabled" : ""
                }`}
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
                className={`btn btn-sm btn-circle text-xl btn-primary ${
                  quantity >= stock ? "btn-disabled" : ""
                }`}
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-4">
            <button
              className={`btn btn-primary ${
                stock < minimumQuantity ? "text-secondary-100" : "text-base-100"
              }`}
              disabled={stock < minimumQuantity}
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              {stock < minimumQuantity ? "Not Available" : "Buy Now"}
            </button>

            {/* Modal */}
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        disabled={quantity <= minimumQuantity}
                        className={`btn btn-sm btn-circle text-xl btn-primary ${
                          quantity <= minimumQuantity ? "btn-disabled" : ""
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
