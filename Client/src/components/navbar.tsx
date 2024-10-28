"use client"; // Ensure this component is client-side only

import { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { RiMenu3Fill } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdArrowDropdown } from "react-icons/io";
import throttle from "lodash.throttle";
import { navLinks as staticNavLinks } from "@/data/navs";
import { Category, ProjectCategory, ServiceData } from "@/types/all-types"; // Import Category, ProjectCategory, and ServiceData
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs
import Accordion from "./accordian";
import LoadingButton from "./Button/LoadingButton";
import { ArrowUpRight } from "lucide-react";
import axios from "axios"; // Import axios

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

  // Fetch categories from Strapi API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
        const path = "/api/categories";

        const url = new URL(path, baseUrl);
        const response = await axios.get(url.toString(), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          },
        });

        const data = response.data;

        if (!Array.isArray(data.data)) {
          throw new Error("Unexpected API response structure");
        }

        // Map categories for dropdown
        const categories = data.data.map((category: Category) => ({
          id: uuidv4(), // Generate a unique ID
          title: category.Title,
          href: `/product/category/${category.categoryId}`,
        }));

        // Update the 'all-products' link in navLinks
        setNavLinks((prevNavLinks) =>
          prevNavLinks.map((link) =>
            link.id === "all-products"
              ? { ...link, children: categories }
              : link
          )
        );
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error fetching categories:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch project categories from Strapi API
  useEffect(() => {
    const fetchProjectCategories = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
        const path = "/api/project-categories";

        const url = new URL(path, baseUrl);
        const response = await axios.get(url.toString(), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          },
        });

        const data = response.data;

        if (!Array.isArray(data.data)) {
          throw new Error("Unexpected API response structure");
        }

        // Map project categories for dropdown
        const projectCategories = data.data.map(
          (projectCategory: ProjectCategory) => ({
            id: uuidv4(), // Generate a unique ID
            title: projectCategory.Title,
            href: `/projects/category/${projectCategory.projCatId}`,
          })
        );

        // Update the 'projects' link in navLinks
        setNavLinks((prevNavLinks) =>
          prevNavLinks.map((link) =>
            link.id === "projects"
              ? { ...link, children: projectCategories }
              : link
          )
        );
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error fetching project categories:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchProjectCategories();
  }, []);

  // Fetch services from Strapi API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
        const path = "/api/services";

        const url = new URL(path, baseUrl);
        const response = await axios.get(url.toString(), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          },
        });

        const data = response.data;

        if (!Array.isArray(data.data)) {
          throw new Error("Unexpected API response structure");
        }

        // Map services for dropdown
        const services = data.data.map((service: ServiceData) => ({
          id: uuidv4(),
          title: service.name || "Unnamed Service",
          href: `/${service.documentId}`,
        }));

        // Update the 'services' link in navLinks with children only, making main link non-clickable
        setNavLinks((prevNavLinks) =>
          prevNavLinks.map((link) =>
            link.id === "services"
              ? { ...link, children: services, href: "#" }
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

  // Navbar rendering
  return (
    <header className="bg-white text-black border-gray-100 border rounded-full mt-5 mx-5 rounded-full flex flex-col transition duration-200 ease-in-out z-50">
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
                      : `${
                          isVisible ? "text-black" : "text-black opacity-85"
                        } hover:text-green-500`
                  } relative p-3 text-xs lg:text-sm whitespace-nowrap tracking-wide font-poppins font-medium cursor-pointer transition-all nav-links`}
                  onMouseEnter={() => handleMouseOver(link.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="text-black uppercase flex items-center font-semibold text-sm py-2 cursor-default">
                    <span className="text-xs">{link.title}</span>
                    {link.children && (
                      <IoMdArrowDropdown size={16} className="ml-1" />
                    )}
                  </span>
                  {link.children && <LinkDropdown link={link} />}
                </div>
              );
            })}
          </ul>
        </div>

        <Link href="/contactus" passHref>
          <button className="hidden lg:flex w-[178px] text-[16px] items-center justify-center bg-green-600 text-white p-2 rounded-full font-semibold">
            Contact Us
            <span className="ml-2">
              <ArrowUpRight size={18} />
            </span>{" "}
          </button>
        </Link>

        {/* Mobile Navigation */}
        <MobileNav navLinks={navLinks} />
      </nav>
    </header>
  );
};

// Nested MobileNav Component (unchanged)
const MobileNav = ({ navLinks }: { navLinks: LinkWithChildren[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const onBeforeNavigate = () => {
    setOpenIndex(null);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <RiMenu3Fill
        size={24}
        className="text-black cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-screen absolute h-screen flex flex-col overflow-y-scroll top-0 left-0 bg-white border-b-[2px] shadow-xl border-gray-400 p-4 transition-all"
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
                    {i !== 0 && (
                      <div className="h-[2px] bg-gray-200 w-1/2 self-center my-2" />
                    )}
                    {link.children && link.children.length > 0 ? (
                      <Accordion
                        title={
                          <span className="hover:text-green-500 text-gray-600 transition-all flex justify-between items-center">
                            {link.title}
                            <IoMdArrowDropdown size={16} />
                          </span>
                        }
                        isOpen={openIndex === i}
                        onClick={() =>
                          openIndex === i ? setOpenIndex(null) : setOpenIndex(i)
                        }
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
                      <Link
                        onClick={onBeforeNavigate}
                        key={link.id}
                        href={link.href}
                        className="w-full flex items-center text-gray-700 hover:text-green-500 transition-all"
                      >
                        {link.title}
                      </Link>
                    )}
                  </div>
                ))}
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
