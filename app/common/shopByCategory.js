"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { categorySlag } from "@/app/redux/product/productSlice";

const categories = [
  {
    id: 1,
    name: "Skincare",
    image:
      "https://babshahi.s3.ap-south-1.amazonaws.com/category/skincare.webp",
    slug: "Skin",
  },
  {
    id: 2,
    name: "Haircare",
    image:
      "https://babshahi.s3.ap-south-1.amazonaws.com/category/haircare.webp",
    slug: "Hair",
  },
  {
    id: 3,
    name: "Personal Care",
    image:
      "https://babshahi.s3.ap-south-1.amazonaws.com/category/personal-care.webp",
    slug: "Personal Care",
  },
  {
    id: 4,
    name: "Men's Grooming",
    image:
      "https://babshahi.s3.ap-south-1.amazonaws.com/category/men’s-grooming.webp",
    slug: "mens-grooming",
  },
  {
    id: 5,
    name: "Fragrance & Perfume",
    image:
      "https://babshahi.s3.ap-south-1.amazonaws.com/category/fragrance-&-perfume.webp",
    slug: "fragrance-perfume",
  },
  {
    id: 6,
    name: "Makeup",
    image:
      "https://babshahi.s3.ap-south-1.amazonaws.com/category/makeup.webp",
    slug: "makeup",
  },
  {
    id: 7,
    name: "Organic Beauty",
    image:
      "https://babshahi.s3.ap-south-1.amazonaws.com/category/logo.jpeg",
    slug: "organic-beauty",
  },
  {
    id: 8,
    name: "Beauty Tools & Device",
    image:
      "https://babshahi.s3.ap-south-1.amazonaws.com/category/beauty-tools-&-device.webp",
    slug: "beauty-tools-device",
  },
];

function ShopByCategory() {
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto mt-14 px-4">
      {/* Section Title */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">
        Shop By Category
      </h2>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/search/${category.slug}`}
            onClick={() => dispatch(categorySlag(category.slug))}
            className="group"
          >
            <div
              className="
              relative bg-white 
              border border-gray-300 
              rounded-2xl 
              p-6 
              flex flex-col items-center justify-center 
              transition-all duration-300 ease-in-out
              hover:shadow-2xl 
              hover:-translate-y-2 
              hover:scale-105
              hover:border-pink-500
              hover:ring-2 
              hover:ring-pink-400 
              hover:ring-offset-2
              "
            >
              {/* Image */}
              <div
                className="
                relative w-16 h-16 md:w-20 md:h-20 mb-4
                transition-transform duration-300 
                group-hover:scale-110
                "
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Category Name */}
              <p
                className="
                text-sm md:text-base 
                text-center 
                text-gray-700 
                font-semibold
                transition-colors duration-300
                group-hover:text-pink-600
                "
              >
                {category.name}
              </p>

              {/* Soft Background Glow */}
              <div
                className="
                absolute inset-0 
                rounded-2xl 
                opacity-0 
                group-hover:opacity-100 
                transition-opacity duration-300
                bg-gradient-to-br 
                from-pink-50 
                to-transparent 
                -z-10
                "
              ></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ShopByCategory;
