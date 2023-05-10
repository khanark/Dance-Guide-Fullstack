import { motion } from "framer-motion";

// Page transition settings
const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

// Page variants
// const pageVariants = {
//   initial: {
//     opacity: 0,
//     y: -50,
//   },
//   animate: {
//     opacity: 1,
//     y: 0,
//     transition: pageTransition,
//   },
//   exit: {
//     opacity: 0,
//     y: 50,
//     transition: pageTransition,
//   },
// };

const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100%",
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};
// Page container styles
const pageContainerStyles = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

// Page container component with motion
const PageContainer = ({ children }) => {
  return (
    <motion.div
      style={pageContainerStyles}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
};

export default PageContainer;
