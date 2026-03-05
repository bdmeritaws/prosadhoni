"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { categorySlag } from "@/app/redux/product/productSlice";
import { getMainCategories, generateSlug } from "@/app/utils/api";

function ShopByCategory() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getMainCategories();
        if (response.success && response.data.category) {
          setCategories(response.data.category);
        } else {
          setError("Failed to fetch categories");
        }
      } catch (err) {
        setError("Error loading categories");
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto mt-14 px-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">
          Shop By Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center h-40"
            >
              <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
              <div className="h-4 w-20 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || categories.length === 0) {
    return null;
  }

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
            href={`/product/category/${generateSlug(category.main_category_name)}`}
            onClick={() => dispatch(categorySlag(generateSlug(category.main_category_name)))}
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
                  src={category.category_image || "/images/logo/favicon.ico"}
                  alt={category.main_category_name || "Category"}
                  fill
                  className="object-contain"
                  unoptimized
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
                {category.main_category_name}
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
