"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/types/all-types";
import { toast } from "react-hot-toast";
import qs from "qs";
import Navbar from "@/components/navbar";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const sliderRef = useRef<Slider | null>(null); // Ref for the slider

  const productId = Array.isArray(params?.documentId)
    ? params.documentId[0]
    : params?.documentId;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  async function fetchProduct(id: string) {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
      const path = `/api/products/${id}`;

      const url = new URL(path, baseUrl);
      url.search = qs.stringify({
        populate: {
          productImage: {
            fields: ["url", "alternativeText"],
          },
        },
      });

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch product");
      }

      const data = await res.json();
      const productData = data.data;

      setProduct(productData);

      fetchRelatedProducts(productData.productCategory, productData.documentId);
    } catch (error) {
      console.error("Error fetching the product:", error);
      toast.error("Error fetching the product.");
    }
  }

  async function fetchRelatedProducts(
    category: string,
    currentProductId: string
  ) {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
      const path = `/api/products`;

      const url = new URL(path, baseUrl);
      url.search = qs.stringify({
        filters: { productCategory: { $eq: category } },
        populate: {
          productImage: {
            fields: ["url", "alternativeText"],
          },
        },
      });

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch related products");
      }

      const data = await res.json();
      const filteredProducts = data.data.filter(
        (p: Product) => p.documentId !== currentProductId
      );

      setRelatedProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  }

  const sliderSettings = {
    infinite: false, // Disable infinite looping
    speed: 500,
    slidesToShow: Math.min(relatedProducts.length, 3), // Adjust number of slides shown based on available products
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: Math.min(relatedProducts.length, 2) },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <>
      <div className="fixed w-full z-50">
        <Navbar />
      </div>

      <main className="my-40 px-4 md:px-20 xl:px-40 w-full flex flex-col">
        {product ? (
          <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="w-full md:w-1/2">
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${product.productImage?.url}`}
                alt={
                  product.productImage?.alternativeText || product.productTitle
                }
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-sm font-semibold text-gray-500 italic">
                {`${product.productCategory} > ${product.productSubCategory}`}
              </p>

              <h2 className="text-3xl font-bold mt-4">
                {product.productTitle}
              </h2>

              <p className="prose mt-6">{product.productDescription}</p>

              <div className="mt-8">
                <p className="text-lg">
                  <span className="font-semibold">SKU:</span> {product.SKU}
                </p>
                <p className="text-lg mt-2">
                  <span className="font-semibold">Price:</span> $
                  {product.productPrice}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading product data...</p>
        )}

        {relatedProducts.length > 0 ? (
          <section className="mt-20">
            <h3 className="text-2xl font-semibold mb-6">Related Products</h3>
            <div className="relative">
              <Slider ref={sliderRef} {...sliderSettings}>
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="p-4">
                    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
                      <Link href={`/product/${relatedProduct.documentId}`}>
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}${relatedProduct.productImage?.url}`}
                          alt={
                            relatedProduct.productImage?.alternativeText ||
                            relatedProduct.productTitle
                          }
                          className="w-full h-40 object-contain rounded-md"
                        />
                        <h4 className="mt-4 font-semibold text-lg">
                          {relatedProduct.productTitle}
                        </h4>
                        <p className="text-gray-500 text-sm mt-1">
                          ${relatedProduct.productPrice}
                        </p>
                      </Link>
                    </div>
                  </div>
                ))}
              </Slider>

              <div className="flex justify-center gap-5 items-center mt-4">
                <button
                  className="text-3xl"
                  onClick={() => sliderRef.current?.slickPrev()}
                >
                  <IoIosArrowBack />
                </button>
                <button
                  className="text-3xl"
                  onClick={() => sliderRef.current?.slickNext()}
                >
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          </section>
        ) : (
          <p className="mt-20 text-gray-500 text-center">
            No related products available.
          </p>
        )}
      </main>
    </>
  );
}
