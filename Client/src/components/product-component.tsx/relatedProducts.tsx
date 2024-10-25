'use client'
import { useEffect, useState } from "react";
import { PageInfo, Product } from "@/types/all-types"; // Adjust the import path accordingly
import axios from "axios";
import { toast } from "react-hot-toast";
import ProductCard from "./productCard";

export default function RelatedProducts({ product }: { product: Product }) {
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [products, setProducts] = useState<Product[]>([]);
  const limit = 5;
  const page = 1;

  useEffect(() => {
    fetchProducts();
  }, [product.category]); // Fetch when the category changes

  async function fetchProducts() {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URI}/products?category=${product.category}&limit=${limit}&page=${page}`
      );
      if (res.status === 200) {
        let prods = res.data.products.filter(
          (p: Product) => p._id !== product._id // Filter out the current product
        );
        if (prods.length === res.data.products.length) {
          prods.pop(); // Remove the last one if necessary
        }

        setProducts(prods);
        setPageInfo({
          currentPage: res.data.currentPage,
          totalPages: res.data.totalPages,
        });
      } else {
        toast.error("Unable to load related products.");
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
      toast.error("Unable to load related products.");
    }
  }

  return (
    <div className="w-full flex flex-col gap-8">
      {products.length === 0 && (
        <p className="text-lg">No related products found.</p>
      )}
      {products.length > 0 && (
        <p className="text-lg">Showing {products.length} related products.</p>
      )}
      <div className="flex max-w-[700px] gap-8 xl:px-20">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
      <p className="hidden">{pageInfo?.currentPage}</p>
    </div>
  );
}
