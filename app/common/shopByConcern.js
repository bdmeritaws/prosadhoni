"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getInventorySubcategories, generateSlug } from "../utils/api";

function ShopByConcern() {
  const [concerns, setConcerns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConcerns = async () => {
      try {
        const response = await getInventorySubcategories();
        
        if (response.success && response.data && response.data.status === 200 && response.data.subcategory) {
          // Transform API data to match component structure
          const transformedData = response.data.subcategory.map((item) => ({
            id: item.id,
            name: item.sub_category_name,
            image: item.sub_category_image,
            slug: generateSlug(item.sub_category_name),
          }));
          setConcerns(transformedData);
        } else {
          setError("Failed to fetch concerns");
        }
      } catch (err) {
        setError("Error loading concerns");
        console.error("Error fetching concerns:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConcerns();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto mt-14 px-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">
          Shop By Concern
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 rounded-full p-[3px] flex flex-col items-center"
            >
              <div className="w-28 h-28 md:w-32 md:h-32 bg-gray-300 rounded-full"></div>
              <div className="h-4 w-16 bg-gray-300 rounded mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || concerns.length === 0) {
    return (
      <div className="container mx-auto mt-14 px-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">
          Shop By Concern
        </h2>
        <div className="flex justify-center items-center py-10">
          <p className="text-gray-500 text-lg">No data found</p>
        </div>
      </div>
    );
  }

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
            href={`/product/shop-by-concern/${concern.slug}?id=${concern.id}`}
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
