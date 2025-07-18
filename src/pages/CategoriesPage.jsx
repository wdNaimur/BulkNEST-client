import React, { useEffect } from "react";
import { Link } from "react-router";
import { motion, useInView } from "framer-motion";

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
  {
    category: "Automotive Parts & Accessories",
    image: "https://i.ibb.co.com/LzrhGyxs/Automotive-Parts-Accessories.png",
  },
  {
    category: "Office Supplies & Stationery",
    image: "https://i.ibb.co/nqqh5S3k/Office-Supplies-Stationery.png",
  },
];

const FeaturedCategories = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  useEffect(() => {
    document.title = "BulkNEST | Categories";
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-base-100 p-10 rounded-box space-y-4 text-center">
        <h2 className="text-4xl font-bold text-primary">All Categories</h2>
        <p className="opacity-70">See and Visit all categories</p>
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
            : { opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }
        }
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-wrap justify-center gap-4 mt-8 px-1"
      >
        {featuredCategories.map((cat, index) => (
          <Link
            to={`${cat.category}`}
            key={index}
            className="basis-full sm:basis-64"
          >
            <motion.div
              className="relative px-4 pb-4 rounded-2xl cursor-pointer bg-primary group overflow-hidden h-full"
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
                    <div className="p-6 rounded-full bg-base-100/30 w-fit mx-auto">
                      <img
                        src={cat.image}
                        alt={cat.category}
                        className="w-24 h-24 object-fit"
                      />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-base-100 text-center">
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
      </motion.div>
    </div>
  );
};

export default FeaturedCategories;
