import Link from "next/link";
import { Product } from "@/types/all-types";
import { AiFillStar, AiOutlineStar } from "react-icons/ai"; // Star icons

export default function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.productImage?.url || "/default-image.jpg"; // Adjusted for Strapi image URL

  // Simulating a random rating between 1 and 5 (since Strapi doesn’t provide it)
  const rating = Math.floor(Math.random() * 5) + 1;

  return (
    <Link
      href={`/product/${product.documentId}`}
      className="w-[270px] bg-white rounded-lg shadow-md p-9 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative w-full  h-auto rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={product.productTitle}
          className="w-full h-full object-contain object-center transition-transform duration-300 hover:scale-105"
        />
        {/* Sale Label Example */}
        {product.isOnSale && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
            SALE!
          </span>
        )}
      </div>

      {/* Product Info Section */}
      <section className="mt-3 flex flex-col gap-1">
        <h4 className="text-gray-900 font-semibold text-lg">
          {product.productTitle}
        </h4>
        <p className="text-sm text-gray-500">
          {product.category.Title || "Category"}
        </p>

        {/* Price and Rating */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }, (_, index) =>
              index < rating ? (
                <AiFillStar key={index} className="text-yellow-500" />
              ) : (
                <AiOutlineStar key={index} className="text-gray-300" />
              )
            )}
          </div>
          <p className="text-red-500 font-semibold">${product.productPrice}</p>
        </div>

        {/* SKU Information */}
        <p className="italic text-xs text-gray-500">
          SKU: {product.SKU || "N/A"}
        </p>
      </section>
    </Link>
  );
}
