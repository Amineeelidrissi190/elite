import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollAnimation = ({ children }) => {
  const { ref, inView } = useInView({
    threshold: 0.3 // déclencher lorsque 50% de l'élément est visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }} // animation initiale
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }} // animation lorsqu'il entre dans la vue
      transition={{ duration: 0.5, ease: 'easeOut' }} // transition fluide
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
