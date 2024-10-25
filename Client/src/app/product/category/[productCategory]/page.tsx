"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/product-component.tsx/productCard";
import { Product } from "@/types/all-types"; // Import the Product type
import qs from "qs";
import Navbar from "@/components/navbar";

export default function ProductsByCategoryPage() {
  const { productCategory } = useParams();
  //   const productCategory = Array.isArray(params?.productCategory) ? params.productCategory[0] : params.productCategory; // Ensures productCategory is a string
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products based on the product category
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
        const path = "/api/products";

        // Query to fetch projects by category
        const query = qs.stringify({
          filters: {
            productCategory: productCategory, // Filter projects by category
          },
          populate: {
            productImage: {
              fields: ["url", "alternativeText"], // Fetch the image URL and alt text
            },
          },
        });

        const url = `${baseUrl}${path}?${query}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        if (!Array.isArray(data.data)) {
          throw new Error("Unexpected API response structure");
        }

        setProducts(data.data); // Store the fetched projects
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchProjects();
  }, [productCategory]);

  if (error) {
    return <div>Error fetching projects: {error}</div>;
  }

  // Render products
  return (
    <>
      <div className="fixed w-full" style={{ zIndex: "999" }}>
        <Navbar />
      </div>
      <div className="w-full my-40 px-4 md:px-2 xl:px-10 grid  grid-cols-1 md:grid-cols-3 justify-items-center md:gap-9">
        {products.length === 0 && (
          <div>No projects found for this category</div>
        )}
        {products.map((product: Product) => (
          <ProductCard key={product.pid} product={product} />
        ))}
      </div>
    </>
  );
}
