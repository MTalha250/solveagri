import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AnimateToView({
  x,
  y,
  scale,
  opacity,
  duration,
  className,
  onClick,
  children,
}: {
  x?: number;
  y?: number;
  scale?: number;
  opacity?: number;
  duration?: number;
  className?: string;
  onClick?: () => void;
  children: JSX.Element | JSX.Element[];
}) {
  const { ref, inView } = useInView({
    threshold: 0.7,
    triggerOnce: true,
  });

  if (!x && !y) {
    y = 48;
  }
  if (!scale) {
    scale = 1;
  }
  if (!opacity) {
    opacity = 0;
  }
  if (!duration) {
    duration = 0.5;
  }

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { opacity: 1, y: 0, x: 0, scale: 1 },
        hidden: { x, y, scale, opacity },
      }}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  );
}
