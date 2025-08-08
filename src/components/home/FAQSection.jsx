import React from "react";
import { motion, useInView } from "framer-motion";

const faqs = [
  {
    question: "What is BulkNest?",
    answer:
      "BulkNest is a B2B wholesale marketplace that connects buyers with verified suppliers for bulk product sourcing at competitive prices.",
  },
  {
    question: "Who can sell on BulkNest?",
    answer:
      "Only verified businesses and manufacturers can sell on BulkNest. All sellers undergo a screening process to ensure product quality and reliability.",
  },
  {
    question: "Is there a minimum order requirement?",
    answer:
      "Yes, each product may have its own minimum order quantity (MOQ) set by the supplier. You’ll see the MOQ details on the product page.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes, once an order is placed and shipped, you’ll receive tracking details through your dashboard and email notifications.",
  },
  {
    question: "What if a product is damaged or not delivered?",
    answer:
      "Our Buyer Protection Policy ensures that you get a refund or replacement if your order isn’t fulfilled as promised. Please report issues within 7 days of delivery.",
  },
];

const FAQSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
          : { opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }
      }
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="container mx-auto px-4 pt-8 pb-16"
    >
      <div className="container px-4 mx-auto text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-secondary">
          FAQs
        </h2>
        <p className="opacity-80"> We’re here to help!</p>
      </div>

      <div>
        <div className="text-left mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow join-item border border-primary/5 shadow-2xl shadow-primary/5 bg-base-100 rounded-box"
            >
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title font-semibold ">
                <span className="text-primary text-lg">{index + 1}. </span>{" "}
                <span className="text-secondary text-lg">{faq.question}</span>
              </div>
              <div className="collapse-content">
                <span className="font-semibold text-primary">Answer: </span>{" "}
                <br />
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FAQSection;
