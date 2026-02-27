"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const concerns = [
  { id: 1, name: "Acne", image: "https://babshahi.s3.ap-south-1.amazonaws.com/category/acne.webp", slug: "acne" },
  { id: 2, name: "Anti Aging", image: "https://babshahi.s3.ap-south-1.amazonaws.com/category/anti-aging.webp", slug: "anti-aging" },
  { id: 3, name: "Dandruff", image: "https://babshahi.s3.ap-south-1.amazonaws.com/category/dandruff.webp", slug: "dandruff" },
  { id: 4, name: "Dry Skin", image: "https://babshahi.s3.ap-south-1.amazonaws.com/category/dry-skin.webp", slug: "dry-skin" },
  { id: 5, name: "Lips", image: "https://babshahi.s3.ap-south-1.amazonaws.com/category/lips.webp", slug: "lips" },
  { id: 6, name: "Hair Fall", image: "https://babshahi.s3.ap-south-1.amazonaws.com/category/hair-fall.webp", slug: "hair-fall" },
  { id: 7, name: "Pore", image: "https://babshahi.s3.ap-south-1.amazonaws.com/category/pore.webp", slug: "pore" },
  { id: 8, name: "Spot", image: "https://babshahi.s3.ap-south-1.amazonaws.com/category/spot.webp", slug: "spot" },
  { id: 9, name: "Sunburn", image: "https://babshahi.s3.ap-south-1.amazonaws.com/category/sunburn.webp", slug: "sunburn" },
];

function ShopByConcern() {
  return (
    <div className="container mx-auto mt-14 px-4">
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">
        Shop By Concern
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8">
        {concerns.map((concern) => (
          <Link
            key={concern.id}
            href={`/search/${concern.slug}`}
            className="flex flex-col items-center group transition-all duration-300"
          >
            {/* Outer Animated Ring */}
            <div
              className="
              relative w-28 h-28 md:w-32 md:h-32 
              rounded-full 
              p-[3px]
              bg-gradient-to-br from-pink-300 to-pink-500
              transition-all duration-300
              group-hover:from-pink-400 group-hover:to-pink-600
              group-hover:scale-105
              group-hover:shadow-xl
              "
            >
              {/* Inner White Circle */}
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <div
                  className="
                  relative w-24 h-24 md:w-28 md:h-28 
                  rounded-full 
                  overflow-hidden
                  transition-transform duration-300
                  group-hover:scale-110
                  "
                >
                  <Image
                    src={concern.image}
                    alt={concern.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="mt-4 text-center transition-all duration-300">
              <p className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
                {concern.name}
              </p>
              <p className="text-[11px] text-gray-500 tracking-widest uppercase group-hover:text-pink-400 transition-colors duration-300">
                Treatment
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ShopByConcern;
