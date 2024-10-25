"use client";
import { AiOutlineMail } from "react-icons/ai";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import Newsletter from "./newsletter";

interface Product {
  id: number;
  productCategory: string;
}

const Footer = () => {
  const [categories, setCategories] = useState<string[]>([]); // State to store unique categories

  // Fetch products and extract unique categories
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
        const response = await fetch(`${baseUrl}/api/products`);
        const data = await response.json();

        console.log("Fetched Data:", data); // Check API response

        if (!Array.isArray(data.data)) {
          throw new Error("Unexpected API response structure");
        }

        // Extract unique categories from the products
        const uniqueCategories: string[] = Array.from(
          new Set(
            data.data.map(
              (product: any) => product.productCategory || "Uncategorized"
            )
          )
        );

        console.log("Unique Categories:", uniqueCategories); // Debug log to verify categories

        setCategories(uniqueCategories); // Update state with unique categories
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-[#000517] flex flex-col items-center justify-center w-full px-4 md:px-20 xl:px-40 gap-12 md:py-20 py-8">
      <div className="h-0.5 w-1/2 bg-[#000517]" />
      <div className="flex flex-col lg:flex-row w-full gap-12">
        <div className="w-full flex flex-col gap-4">
          <h1 className="text-white text-3xl font-medium">About</h1>
          <img className="w-[30%]" src="/logo.png" alt="" />
          <div className="flex flex-col gap-1">
            <p className="text-white">
              L – 199, Model Town Extension, Lahore (54700) Pakistan
            </p>
            <p className="text-white">+92 304-1115566</p>
            <p className="text-white">+92 42 3585 6772-5</p>
            <p className="text-white">info@solveagripak.com</p>
          </div>
          <div className="flex gap-4 w-full justify-start flex-wrap">
            <a href="mailto:drliveluv@att.net" target="_blank" rel="noreferrer">
              <AiOutlineMail className="text-2xl text-LG hover:text-LLG" />
            </a>
            <a
              href="https://www.facebook.com/spoiledwit"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF className="text-2xl text-LG hover:text-LLG" />
            </a>
            <a
              href="https://www.twitter.com/spoiledwit"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter className="text-2xl text-LG hover:text-LLG" />
            </a>
            <a
              href="https://www.instagram.com/drliveluv"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="text-2xl text-LG hover:text-LLG" />
            </a>
            <a
              href="https://www.pinterest.com/drliveluv"
              target="_blank"
              rel="noreferrer"
            >
              <FaPinterest className="text-2xl text-LG hover:text-LLG" />
            </a>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <h1 className="text-white text-3xl font-medium">Quick Links</h1>
          <div className="flex flex-col gap-1">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/product/category/${category}`}
                className="text-white hover:text-LG"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <h1 className="text-white text-3xl font-medium">Policies</h1>
          <div className="flex flex-col gap-1">
            <Link href="/" className="text-white hover:text-LG">
              Privacy Policy
            </Link>
            <Link href="/" className="text-white hover:text-LG">
              Shipping Policy
            </Link>
            <Link href="/" className="text-white hover:text-LG">
              Terms and Conditions
            </Link>
          </div>
        </div>

        <div className="md:flex hidden flex-col items-center">
          <h1 className="text-white text-lg w-[200px] font-medium">
            Other Companies
          </h1>
          <div>
            <img
              src="/footer/agridairy.png"
              alt="agridairy"
              className="w-[60%] mr-5 mt-1"
            />
            <img
              src="/footer/agrifeeds.png"
              alt="agrifeeds"
              className="w-[60%] mt-2 mr-5"
            />
            <img
              src="/footer/agrifoundation.png"
              alt="agrifoundation"
              className="w-[60%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
