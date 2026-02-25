"use client";

import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg bg-white overflow-hidden flex flex-col hover:shadow-md transition">

      {/* Image */}
      <div className="relative w-full h-36 bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-2"
        />
      </div>

      {/* Content */}
      <div className="p-3 flex-1">
        <p className="text-xs text-gray-800 line-clamp-2">
          {product.name}
        </p>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-semibold text-purple-600">
            ৳ {product.price}
          </span>

          {product.oldPrice && (
            <span className="text-xs line-through text-gray-400">
              ৳ {product.oldPrice}
            </span>
          )}
        </div>
      </div>

      {/* Button */}
      <button className="bg-[#8F2C8C] text-white text-sm py-2 px-4 rounded hover:bg-[#6F1D6C] transition-colors">
        Add To Cart
      </button>

    </div>
  );
}
