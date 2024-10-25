// components/Accordion.jsx

import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowUp } from "react-icons/io";

type AccordionProps = {
  title: JSX.Element;
  children: JSX.Element;
  isOpen: boolean;
  onClick: () => void;
};

const Accordion = ({ title, children, isOpen, onClick }: AccordionProps) => {
  return (
    <>
      <div
        onClick={onClick}
        className="text-green-500 tracking-wide text-lg flex items-center justify-between w-full cursor-pointer"
      >
        {title}
        <motion.div animate={{ rotate: isOpen ? 0 : 180 }} className="h-4">
          <IoIosArrowUp size={16} />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <motion.div
              variants={{ collapsed: { y: 32 }, open: { y: 0 } }}
              transition={{ duration: 0.2 }}
              className="w-full px-4 py-2 text-sm"
            >
              {children}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Accordion;
