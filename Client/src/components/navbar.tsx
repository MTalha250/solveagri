'use client'; // Ensure this component is client-side only

import { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { RiMenu3Fill } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdArrowDropdown } from "react-icons/io";
import throttle from "lodash.throttle";
import { navLinks as staticNavLinks } from "@/data/navs";
import { ServiceData, Product } from "@/types/all-types"; // Updated with Product
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs
import Accordion from "./accordian";
import LoadingButton from "./Button/LoadingButton";
import { ArrowUpRight } from 'lucide-react';

// Define the type for navigation links
type LinkWithChildren = {
  id: string;
  title: string;
  href: string;
  children?: LinkWithChildren[];
};

const Navbar = () => {
  const [navLinks, setNavLinks] = useState<LinkWithChildren[]>(staticNavLinks);
  const [pathname, setPathname] = useState(""); // Store the current path
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // For tracking active dropdowns
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch services from Strapi API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
        const path = "/api/services";

        const url = new URL(path, baseUrl);
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();

        if (!Array.isArray(data.data)) {
          throw new Error("Unexpected API response structure");
        }

        const services = data.data.map((service: ServiceData) => ({
          id: uuidv4(), // Generate a unique ID
          title: service.name,
          href: `/${service.documentId}`,
        }));

        if (services.length === 0) {
          throw new Error("No services available");
        }

        // Update the 'services' link in navLinks
        setNavLinks((prevNavLinks) =>
          prevNavLinks.map((link) =>
            link.id === "services"
              ? {
                  ...link,
                  children: services,
                  href: services[0].href, // Set href to first service's href
                }
              : link
          )
        );
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error fetching services:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Fetch products and categorize them by productCategory
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
        const path = "/api/products";

        const url = new URL(path, baseUrl);
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        if (!Array.isArray(data.data)) {
          throw new Error("Unexpected API response structure");
        }

        // Group products by category
        const categories = data.data.reduce((acc: any, product: Product) => {
          if (!acc[product.productCategory]) {
            acc[product.productCategory] = [];
          }
          acc[product.productCategory].push({
            id: uuidv4(), // Generate a unique ID for each child
            title: product.productTitle,
            href: `/product/category/${product.productCategory}`, // Correct link
          });
          return acc;
        }, {});

        const productCategories = Object.keys(categories).map((category) => ({
          id: uuidv4(), // Generate a unique ID for each category
          title: category,
          href: `/product/category/${category}`, // Redirect to category
          children: categories[category],
        }));

        // Update the 'all-products' link in navLinks
        setNavLinks((prevNavLinks) =>
          prevNavLinks.map((link) =>
            link.id === "all-products" ? { ...link, children: productCategories } : link
          )
        );
      } catch (error: any) {
        console.error("Error fetching products:", error);
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  // Set the current pathname
  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  // Handle scroll to show/hide navbar with throttling
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    if (pathname !== "/") {
      setIsVisible(true);
      return;
    }
    setIsVisible(!(lastScrollPos > currentScrollPos && currentScrollPos < 100));
    setLastScrollPos(currentScrollPos);
  };

  useEffect(() => {
    const throttledHandleScroll = throttle(handleScroll, 200); // 200ms throttle

    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      throttledHandleScroll.cancel();
    };
  }, [lastScrollPos, pathname]);

  // Handle hover events for dropdowns
  const handleMouseOver = (linkId: string) => {
    setActiveDropdown(linkId);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  // Dropdown component for desktop navigation
  const LinkDropdown = ({ link }: { link: LinkWithChildren }) => {
    const isOpen = activeDropdown === link.id; // Check if the dropdown is active

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ ease: "circOut", duration: 0.15 }}
        className="absolute top-full left-0 mt-2 rounded-md shadow-lg bg-white z-50"
      >
        <div className="py-1">
          {link.children?.map((c) => (
            <Link
              key={c.id} // Now each child has a unique ID
              href={c.href}
              className="block px-4 py-2 text-sm text-black hover:bg-LG"
            >
              {c.title}
            </Link>
          ))}
        </div>
      </motion.div>
    );
  };

  // Show loading or error states
  if (isLoading) {
    return (
      <header className="mt-5 mx-5 rounded-full flex flex-col transition duration-200 ease-in-out z-50">
        <div className="w-full flex justify-center py-4">
          <p>Loading...</p>
        </div>
      </header>
    );
  }

  if (error) {
    return (
      <header className="mt-5 mx-5 rounded-full flex flex-col transition duration-200 ease-in-out z-50">
        <div className="w-full flex justify-center py-4">
          <p>Error: {error}</p>
        </div>
      </header>
    );
  }

  return (
    <header
    className={`${
      isVisible
        ? "bg-white text-black border-gray-100 border rounded-full"
        : "pt-5 text-white"
    } mt-5 mx-5 rounded-full flex flex-col transition duration-200 ease-in-out z-50`}
  >
      <nav className="w-full text-black flex py-3 items-center justify-between border-gray-200 px-4 xl:px-16">
        {/* Logo */}
        <Link href="/" className="min-w-max">
          <img src="/logo.png" alt="logo" className="h-[60px]" />
        </Link>

        {/* Desktop Navigation */}
        <div className="w-full hidden md:flex">
          <ul id="desktop-nav" className="w-full flex justify-center space-x-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div
                  id={link.id}
                  key={link.id}
                  className={`${
                    isActive
                      ? "text-green-500"
                      : `${isVisible ? "text-black" : "text-black opacity-85"} hover:text-green-500`
                  } relative p-3 text-xs lg:text-sm whitespace-nowrap tracking-wide font-poppins font-medium cursor-pointer transition-all nav-links`}
                  onMouseEnter={() => handleMouseOver(link.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href={link.href} className="text-black uppercase flex items-center font-semibold text-sm py-2">
                    <span className="text-xs">{link.title}</span>
                    {link.children && <IoMdArrowDropdown size={16} className="ml-1" />}
                  </Link>
                  {link.children && <LinkDropdown link={link} />}
                </div>
              );
            })}
          </ul>
        </div>

              <Link href="/contactus" passHref>
                <button className="hidden lg:flex w-[178px] text-[16px] items-center justify-center bg-white p-2 rounded-full font-semibold">Book a Meeting <span className="ml-2"><ArrowUpRight size={18}/></span> </button>
              </Link>

        {/* Mobile Navigation */}
        <MobileNav navLinks={navLinks} />
      </nav>
    </header>
  );
};

// Nested MobileNav Component
const MobileNav = ({ navLinks }: { navLinks: LinkWithChildren[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const onBeforeNavigate = () => {
    setOpenIndex(null);
    setIsOpen(false);
  };

  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollPos, setLastScrollPos] = useState(0);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setIsVisible(!(lastScrollPos > currentScrollPos && currentScrollPos < 100));
    setLastScrollPos(currentScrollPos);
  };

  useEffect(() => {
    const throttledHandleScroll = throttle(handleScroll, 200); // 200ms throttle

    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      throttledHandleScroll.cancel();
    };
  }, [lastScrollPos]);

  return (
    <div>
      <RiMenu3Fill
        size={24}
        className={`md:hidden ${!isVisible ? "text-black" : "text-black"} cursor-pointer`}
        onClick={() => setIsOpen(true)}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-screen absolute h-screen flex flex-col overflow-y-scroll top-0 left-0 bg-white  border-b-[2px] shadow-xl border-gray-400 p-4 transition-all"
          >
            <div className="flex flex-col w-full">
              <AiOutlineClose
                className="w-[24px] self-end text-black cursor-pointer h-[24px]"
                onClick={() => setIsOpen(false)}
              />
              <motion.nav
                initial={{ y: 32 }}
                animate={{ y: 0 }}
                transition={{ ease: "easeOut", duration: 0.15 }}
                className="w-full flex flex-col mt-4"
              >
                {navLinks.map((link, i) => (
                  <div key={link.id} className="flex flex-col w-full mb-2">
                    {i !== 0 && <div className="h-[2px] bg-gray-200 w-1/2 self-center my-2" />}
                    {link.children && link.children.length > 0 ? (
                      <Accordion
                        title={
                          <Link onClick={onBeforeNavigate} href={link.href} className="hover:text-green-500 text-gray-600 transition-all flex justify-between items-center">
                            {link.title}
                            <IoMdArrowDropdown size={16} />
                          </Link>
                        }
                        isOpen={openIndex === i}
                        onClick={() => (openIndex === i ? setOpenIndex(null) : setOpenIndex(i))}
                      >
                        <div className="ml-4 mt-2">
                          {link.children.map((c) => (
                            <Link
                              onClick={onBeforeNavigate}
                              key={c.id}
                              href={c.href}
                              className="block py-1 text-gray-700 hover:text-green-500"
                            >
                              {c.title}
                            </Link>
                          ))}
                        </div>
                      </Accordion>
                    ) : (
                      <Link onClick={onBeforeNavigate} key={link.id} href={link.href} className="w-full flex items-center text-gray-700 hover:text-green-500 transition-all">
                        {link.title}
                      </Link>
                    )}
                  </div>
                ))}
              </motion.nav>
            </div>
            <Link href="/" onClick={onBeforeNavigate} className="min-w-max self-center mt-8 grayscale">
              <img src="/logo.png" alt="logo" className="h-24" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
