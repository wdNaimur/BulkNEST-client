import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const CategoriesSection = () => {
  const featuredCategories = [
    {
      category: "Electronics & Gadgets",
      image: "https://i.ibb.co/39XxnkVN/Electronics-Gadgets.png",
    },
    {
      category: "Home & Kitchen Appliances",
      image: "https://i.ibb.co/vCVYGxw4/Home-Kitchen-Appliances.png",
    },
    {
      category: "Fashion & Apparel",
      image: "https://i.ibb.co/SXsbbCkd/Fashion-Apparel.png",
    },
    {
      category: "Industrial Machinery & Tools",
      image: "https://i.ibb.co/0pLGHFSd/Industrial-Machinery-Tools.png",
    },
    {
      category: "Health & Beauty",
      image: "https://i.ibb.co/j9cj50DV/Health-Beauty.png",
    },
  ];
  return (
    <section className="py-8 bg-base-100">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-secondary">
            Featured Categories
          </h2>
          <p className="opacity-80">
            Explore Products Tailored for Every Business Need
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 px-1">
          {featuredCategories.map((cat, index) => (
            <Link
              to={`${cat.category}`}
              key={index}
              className="basis-full sm:basis-64"
            >
              <motion.div
                className="relative px-4 pb-4 rounded-2xl cursor-pointer bg-base-200 shadow-2xl shadow-primary/10 group overflow-hidden h-full border-2 border-primary/15"
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
                      <div className="p-6 rounded-full bg-primary/20 w-fit mx-auto">
                        <img
                          src={cat.image}
                          alt={cat.category}
                          className="w-24 h-24 object-fit"
                        />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-secondary/90 text-center">
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
                  <button className="btn btn-secondary text-base-100 border-none hover:shadow-2xl hover:scale-105 active:scale-95 transition-all ease-in">
                    Shop Now
                  </button>
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </div>
        <button className="btn btn-primary mt-4 text-base-200">
          View All Category
        </button>
      </div>
    </section>
  );
};

export default CategoriesSection;
