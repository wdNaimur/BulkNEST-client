import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const featuredCategories = [
  {
    category: "Electronics & Gadgets",
    image: "https://i.ibb.co.com/LzrhGyxs/Automotive-Parts-Accessories.png",
  },
  {
    category: "Home & Kitchen Appliances",
    image: "https://i.ibb.co.com/LzrhGyxs/Automotive-Parts-Accessories.png",
  },
  {
    category: "Fashion & Apparel",
    image: "https://i.ibb.co.com/LzrhGyxs/Automotive-Parts-Accessories.png",
  },
  {
    category: "Industrial Machinery & Tools",
    image: "https://i.ibb.co.com/LzrhGyxs/Automotive-Parts-Accessories.png",
  },
  {
    category: "Health & Beauty",
    image: "https://i.ibb.co.com/LzrhGyxs/Automotive-Parts-Accessories.png",
  },
  {
    category: "Automotive Parts & Accessories",
    image: "https://i.ibb.co.com/LzrhGyxs/Automotive-Parts-Accessories.png",
  },
  {
    category: "Office Supplies & Stationery",
    image: "https://i.ibb.co.com/LzrhGyxs/Automotive-Parts-Accessories.png",
  },
];

const FeaturedCategories = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-base-100 p-10 rounded-box space-y-4 text-center">
        <h2 className="text-4xl font-bold text-primary">All Categories</h2>
        <p className="opacity-70">See and Visit all categories</p>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-4 mt-8">
        {featuredCategories.map((cat, index) => (
          <Link to={`${cat.category}`}>
            <motion.div
              key={index}
              className="relative px-4 pb-4 rounded-2xl w-60 cursor-pointer bg-secondary group overflow-hidden h-full"
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={{
                rest: {},
                hover: {},
              }}
            >
              {/* Glass Overlay */}
              <motion.div
                className="absolute inset-0 bg-base-200/20 rounded-2xl z-10 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                variants={{
                  rest: { opacity: 0 },
                  hover: {
                    opacity: 1,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  },
                }}
              />

              {/* Content */}
              <div className="relative z-0 flex flex-col justify-between h-full">
                <div>
                  <div className="my-4">
                    <img
                      src={cat.image}
                      alt={cat.category}
                      className="h-22 bg-base-100 p-4 rounded-full object-contain"
                    />
                  </div>
                  <h3 className="text-3xl font-bold text-base-100">
                    {cat.category}
                  </h3>
                </div>
              </div>

              {/* Shop Now Button */}
              <motion.div
                className="absolute bottom-1/2 right-1/2 z-30"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                variants={{
                  rest: {
                    opacity: 0,
                    y: 20,
                    scale: 0.8,
                    transition: { duration: 0.3 },
                  },
                  hover: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.3, ease: "easeOut" },
                  },
                }}
                style={{ translateX: "50%", translateY: "50%" }}
              >
                <button className="btn btn-primary text-base-100 border-none hover:shadow-2xl hover:scale-105 active:scale-95 transition-all ease-in">
                  Shop Now
                </button>
              </motion.div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
