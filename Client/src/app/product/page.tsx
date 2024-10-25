"use client";
import { useEffect, useState } from "react";
import qs from "qs";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCard from "@/components/product-component.tsx/productCard"; // Import the separate ProductCard component
import { Product } from "@/types/all-types";
import Navbar from "@/components/navbar";

// Fetch products with populated images from Strapi
async function getProducts(
  page: number
): Promise<{ products: Product[]; total: number }> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  const path = "/api/products";

  const url = new URL(path, baseUrl);

  // Use qs to populate the image and request more products by setting pageSize
  url.search = qs.stringify({
    populate: {
      productImage: {
        fields: ["alternativeText", "url"], // Fetch image URL and alt text
      },
    },
    pagination: {
      page: page, // Fetch the current page of products
      pageSize: 3, // Set to 1 to fetch only 1 product per page
    },
  });

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();
  const total = data.meta.pagination.total; // Get total number of products

  return { products: data.data, total };
}

export default function ProductsPage() {
  const [page, setPage] = useState(1); // Track the current page
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0); // Track total number of products
  const [loading, setLoading] = useState(true);

  // Fetch products when the page changes
  const fetchProducts = async (page: number) => {
    setLoading(true);
    const { products, total } = await getProducts(page);
    console.log(products);
    setProducts(products);
    setTotal(total);
    setLoading(false);
  };

  // Fetch products on initial load and page change
  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const totalPages = Math.ceil(total / 3); // Calculate total pages (1 product per page)

  return (
    <>
      <div className="fixed w-full" style={{ zIndex: "999" }}>
        <Navbar />
      </div>
      <div className="mt-36 text-center">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {loading ? (
            <Skeleton count={1} height={500} width={500} />
          ) : (
            products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-LG hover:bg-gray-300 rounded mr-2"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300  hover:bg-LG rounded hover:"
          >
            Next
          </button>
        </div>

        {/* Page number display */}
        <div className="mt-4 text-center">
          <p>
            Page {page} of {totalPages}
          </p>
        </div>
      </div>
    </>
  );
}
