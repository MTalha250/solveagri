"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AnimateToView from "../AnimateToView";
import { Category } from "@/types/all-types";
import qs from "qs";
import { useRouter } from "next/navigation";
import axios from "axios";

const ProductCat = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
        const path = "/api/categories";

        const query = qs.stringify({
          populate: {
            Image: {
              fields: ["url", "alternativeText"],
            },
          },
        });

        const url = `${baseUrl}${path}?${query}`;
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          },
        });

        if (!Array.isArray(response.data.data)) {
          throw new Error("Unexpected API response structure");
        }

        setCategories(response.data.data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error fetching products: {error}
      </div>
    );
  }

  return (
    <div className="px-4 md:px-20 xl:px-40 md:py-20 py-10 w-full">
      <AnimateToView>
        <h1 className="md:text-[40px] text-[30px] mb-3 text-white">
          Our Product Categories.
        </h1>
      </AnimateToView>
      <div className="flex flex-col gap-12 mt-5">
        <AnimateToView className="flex w-full gap-4">
          <div className="h-[1px] ml-[-30px] mt-3 w-32 bg-gray-300 shrink-0" />
          <p className="text-gray-300 md:text-xl font-light ">
            Our commitment is to provide dependable, high-quality product
            categories that address every facet of your livestock and dairy
            needs, no matter the scale of your operation. Our extensive
            selection includes specialized products, innovative equipment, and
            tailored solutions crafted for efficient livestock management and
            enhanced productivity. From nutritional supplements to advanced
            farming tools, we empower farmers, suppliers, and processors to
            optimize their processes and boost profitability across the board.
          </p>
        </AnimateToView>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-10 mt-8 w-full max-w-6xl">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category.id}
                className="group relative cursor-pointer bg-[#f0f4f875] border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition duration-300 p-5 overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                  onClick={() =>
                    router.push(`/product/category/${category.categoryId}`)
                  }
                ></div>
                {/* Image Section */}
                <img
                  className="w-full h-60 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                  src={category.Image?.url}
                  alt={category.Image?.alternativeText || category.Title}
                />

                {/* Category Title */}
                <h2 className="text-center mt-4 text-xl font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                  {category.Title}
                </h2>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No products available at the moment.
            </p>
          )}
        </div>

        {/* View All Products Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/product"
            className="text-center text-white bg-green-600 py-3 px-12 rounded-full hover:bg-green-600 transition duration-300 shadow-md"
          >
            View All Products <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCat;
