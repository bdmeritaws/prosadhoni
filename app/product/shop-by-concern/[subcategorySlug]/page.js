"use client";

import React, { useState, useEffect } from "react";
import ProductCart from "@/app/product/productCart";
import { useParams, useSearchParams } from "next/navigation";
import { getInventorySubcategories, getProductsByInventorySubcategory, generateSlug } from "@/app/utils/api";

function ShopByConcernPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const subcategorySlug = params?.subcategorySlug;
  const subcategoryId = searchParams?.get("id");
  
  const [loading, setLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        let resolvedSubcategoryId = subcategoryId;
        
        // If no ID in query, try to get ID from slug
        if (!resolvedSubcategoryId && subcategorySlug) {
          const subResult = await getInventorySubcategories();
          if (subResult.success && subResult.data?.subcategory) {
            const foundSub = subResult.data.subcategory.find(
              (sub) => generateSlug(sub.sub_category_name) === subcategorySlug
            );
            if (foundSub) {
              resolvedSubcategoryId = foundSub.id;
              setPageTitle(foundSub.sub_category_name);
            }
          }
        }
        
        if (!resolvedSubcategoryId) {
          setError("Subcategory not found");
          setLoading(false);
          return;
        }

        // Fetch products by inventory subcategory to get the title if not set
        if (!pageTitle) {
          const productResult = await getProductsByInventorySubcategory(resolvedSubcategoryId);
          // Title will be set from the subcategory lookup above
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (subcategorySlug || subcategoryId) {
      fetchData();
    }
  }, [subcategorySlug, subcategoryId, pageTitle]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 mt-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-lg h-80"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {subcategorySlug ? `${subcategorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Products` : "Shop By Concern"}
      </h1>
      
      {/* Use ProductCart with subCategory filter for inventory subcategory */}
      <ProductCart subCategory={subcategoryId || subcategorySlug} filterType="inventory_subcategory" />
    </div>
  );
}

export default ShopByConcernPage;
