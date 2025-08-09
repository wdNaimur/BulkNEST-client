import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const fillSteps = [0.1, 0.4, 0.7, 0.85, 1];
const delays = [0.1, 0.2, 0.4, 0.3];

const LoaderDataFetch = () => {
  const controls = useAnimation();

  useEffect(() => {
    const animateFill = async () => {
      for (let i = 0; i < fillSteps.length; i++) {
        await controls.start({
          clipPath: `inset(0 ${(1 - fillSteps[i]) * 100}% 0 0)`,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 20,
          },
        });
        await new Promise((resolve) => setTimeout(resolve, delays[i] * 1000));
      }
    };

    animateFill();
  }, [controls]);

  return (
    <div className="h-full flex justify-center lg:pt-[calc(30vh-65px)] pt-[calc(30vh-64px)] lg:pb-[calc(30vh-65px)] pb-[calc(30vh-64px)] bg-transparent">
      <div className="relative flex items-baseline text-6xl font-black font-unbounded text-primary/20">
        {/* Base text */}
        <span className="select-none uppercase">Loading</span>

        {/* Animated fill */}
        <motion.span
          className="absolute top-0 left-0 text-primary uppercase"
          style={{ clipPath: "inset(0 100% 0 0)" }}
          animate={controls}
        >
          Loading
        </motion.span>
      </div>
    </div>
  );
};

export default LoaderDataFetch;
