"use client";
import React, { useState, useEffect } from "react";
import ProductCart from "@/app/product/productCart";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

function CategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params?.categoryId;
  const subcategoryId = params?.subcategoryId;
  
  const [activeSub, setActiveSub] = useState("all");
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainCategoryName, setMainCategoryName] = useState("");
  const [isReady, setIsReady] = useState(false);

  // ================= UPDATE ACTIVE SUB CATEGORY FROM URL =================
  useEffect(() => {
    if (subcategoryId) {
      setActiveSub(subcategoryId);
    } else {
      setActiveSub("all");
    }
    // Mark as ready after setting initial state
    setTimeout(() => setIsReady(true), 100);
  }, [subcategoryId]);

  /* ================= FETCH CATEGORY & SUBCATEGORY ================= */
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const catId = parseInt(categoryId) || 0;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}subcategory`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Origin: "https://babshahi.com",
              Referer: "https://babshahi.com",
              "User-Agent": "Mozilla/5.0",
            },
            body: JSON.stringify({
              ClientService: "frontend-client",
              AuthKey: "Babshahi",
              ContentType: "application/json",
              shop_name: "prosadhoni",
              main_category_id: catId,
            }),
          }
        );

        const data = await response.json();

        if (data?.main_category?.name) {
          setMainCategoryName(data.main_category.name);
        }

        let subCategoryList = [];

        if (Array.isArray(data?.subcategories)) {
          subCategoryList = data.subcategories;
        } else if (Array.isArray(data?.subcategory)) {
          subCategoryList = data.subcategory;
        } else if (Array.isArray(data?.Data)) {
          subCategoryList = data.Data;
        } else if (Array.isArray(data?.data)) {
          subCategoryList = data.data;
        }

        if (subCategoryList.length > 0) {
          const formatted = [
            { id: "all", name: "All", icon: "" },
            ...subCategoryList.map((sub) => ({
              id: sub.id,
              name:
                sub.name ||
                sub.subcategory_name ||
                sub.sub_cat_name ||
                "Sub Category",
              icon: sub.image || sub.icon || "",
            })),
          ];
          setSubCategories(formatted);
        } else {
          setSubCategories([{ id: "all", name: "All", icon: "" }]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setSubCategories([{ id: "all", name: "All", icon: "" }]);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryData();
    } else {
      setLoading(false);
      setSubCategories([{ id: "all", name: "All", icon: "" }]);
    }
  }, [categoryId]);

  // ================= HANDLE SUBCATEGORY CLICK =================
  const handleSubCategoryClick = (subId) => {
    setActiveSub(subId);
    if (subId === "all") {
      router.push(`/product/category/${categoryId}`);
    } else {
      router.push(`/product/category/${categoryId}/${subId}`);
    }
  };

  return (
    <div className="container mx-auto mt-6 px-2">

      {/* ================= MOBILE SUBCATEGORY ================= */}
      <div className="lg:hidden mb-4 overflow-x-auto">
        <div className="flex gap-3">
          {loading ? (
            <div className="flex gap-3 animate-pulse">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="px-4 py-2 rounded-full bg-gray-200 h-10 w-20"
                ></div>
              ))}
            </div>
          ) : (
            subCategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => handleSubCategoryClick(sub.id)}
                className={`px-4 py-2 whitespace-nowrap rounded-full border text-sm
                  transition-all duration-300 ease-in-out
                  ${
                    activeSub === sub.id
                      ? "bg-[#8F2C8C] text-white border-[#8F2C8C]"
                      : "bg-white border-gray-300 hover:bg-[#8F2C8C] hover:text-white hover:border-[#8F2C8C]"
                  }`}
              >
                {sub.name}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">

        {/* ================= DESKTOP SIDEBAR ================= */}
        <div className="hidden lg:block col-span-3">
          <div className="bg-white border rounded-xl shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">
              {mainCategoryName || "Category"}
            </h2>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2 rounded-lg animate-pulse"
                  >
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {subCategories.map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => handleSubCategoryClick(sub.id)}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer
                      transition-all duration-300 ease-in-out
                      ${
                        activeSub === sub.id
                          ? "bg-[#8F2C8C] text-white"
                          : "hover:bg-[#8F2C8C] hover:text-white"
                      }`}
                  >
                    {sub.icon ? (
                      <Image
                        src={sub.icon}
                        alt={sub.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium">
                          {sub.name?.charAt(0)}
                        </span>
                      </div>
                    )}

                    <span className="text-sm font-medium">
                      {sub.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ================= PRODUCT SECTION ================= */}
        <div className="col-span-12 lg:col-span-9">
          {!isReady || loading ? (
            <div className="grid lg:grid-cols-4 grid-cols-2 md:gap-4 gap-2.5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-md h-[200px] md:h-[250px]"></div>
                  <div className="mt-3 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ProductCart
              slug={categoryId}
              filterType="category"
              subCategory={activeSub}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
