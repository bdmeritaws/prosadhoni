"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "@/app/product/loader";
import AddToCart from "@/app/common/addToCart";
import { useSelector } from "react-redux";
import noResultFound from "../../public/No-Result-Found.jpg";
import Image from "next/image";
import { getCategoryProducts, getSubcategoryProducts, getProductsByInventorySubcategory } from "@/app/utils/api";

function ProductCart({ slug, filterType, subCategory }) {
  const AppURL = process.env.NEXT_PUBLIC_BASE_URL;

  const categoryId = useSelector((state) => state.products.categorySlag);

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 15;

  /* ---------------- FETCH FUNCTION ---------------- */

  const fetchProducts = async (page = 1) => {
    try {
      setIsLoading(true);

      let result;

      // Handle filter type (top_deals, under_99, category)
      if (filterType === "top_deals") {
        // Use existing API for top deals
        const response = await fetch(`${AppURL}product_top_deal`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Origin": typeof window !== 'undefined' ? window.location.origin : "https://babshahi.com",
            "Referer": typeof window !== 'undefined' ? window.location.href : "https://babshahi.com",
          },
          body: JSON.stringify({
            ClientService: "frontend-client",
            AuthKey: "Babshahi",
            ContentType: "application/json",
            shop_name: "prosadhoni",
            institute_id: 10,
            page,
            limit: itemsPerPage,
          }),
          cache: "no-store",
        });
        result = await response.json();
      } else if (filterType === "under_99") {
        // Use existing API for under 99
        const response = await fetch(`${AppURL}product_under_99`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Origin": typeof window !== 'undefined' ? window.location.origin : "https://babshahi.com",
            "Referer": typeof window !== 'undefined' ? window.location.href : "https://babshahi.com",
          },
          body: JSON.stringify({
            ClientService: "frontend-client",
            AuthKey: "Babshahi",
            ContentType: "application/json",
            shop_name: "prosadhoni",
            institute_id: 10,
            page,
            limit: itemsPerPage,
          }),
          cache: "no-store",
        });
        result = await response.json();
      } else if (filterType === "category") {
        // Check if subcategory is selected (not "all")
        if (subCategory && subCategory !== "all") {
          // Fetch products by subcategory using new API
          console.log("Fetching products by subcategory:", subCategory);
          const apiResult = await getSubcategoryProducts(subCategory, page, itemsPerPage);
          result = apiResult.data || {};
        } else {
          // Fetch products by category ID using new API
          // Use slug as category_id when it's numeric
          const categoryId = /^[0-9]+$/.test(slug) ? slug : null;
          console.log("Fetching all products for category:", categoryId || slug);
          const apiResult = await getCategoryProducts(categoryId || slug, page, itemsPerPage);
          result = apiResult.data || {};
        }
      } else if (filterType === "inventory_subcategory") {
        // Fetch products by inventory subcategory (for shop by concern page)
        if (subCategory) {
          console.log("Fetching products by inventory subcategory:", subCategory);
          const apiResult = await getProductsByInventorySubcategory(subCategory, page, itemsPerPage);
          result = apiResult.data || {};
        } else {
          result = { products: [] };
        }
      } else if (slug) {
        // Check if slug is numeric (category ID) or string (search text)
        const isCategoryId = /^[0-9]+$/.test(slug);
        if (isCategoryId) {
          // Category ID - fetch products by category using new API
          const apiResult = await getCategoryProducts(slug, page, itemsPerPage);
          result = apiResult.data || {};
        } else {
          // Search text - fetch products by name using existing API
          const response = await fetch(`${AppURL}product_by_name`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Origin": typeof window !== 'undefined' ? window.location.origin : "https://babshahi.com",
              "Referer": typeof window !== 'undefined' ? window.location.href : "https://babshahi.com",
            },
            body: JSON.stringify({
              ClientService: "frontend-client",
              AuthKey: "Babshahi",
              ContentType: "application/json",
              shop_name: "prosadhoni",
              product_name: slug,
              page,
              limit: itemsPerPage,
            }),
            cache: "no-store",
          });
          result = await response.json();
        }
      } else {
        // Default product list
        const response = await fetch(`${AppURL}product`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Origin": typeof window !== 'undefined' ? window.location.origin : "https://babshahi.com",
            "Referer": typeof window !== 'undefined' ? window.location.href : "https://babshahi.com",
          },
          body: JSON.stringify({
            ClientService: "frontend-client",
            AuthKey: "Babshahi",
            ContentType: "application/json",
            shop_name: "prosadhoni",
            category_id: categoryId || 0,
          }),
          cache: "no-store",
        });
        result = await response.json();
      }

      setProducts(result?.products || []);

      if (result?.total) {
        setTotalPages(Math.ceil(result.total / itemsPerPage));
      } else if (result?.products?.length) {
        setTotalPages(1);
      } else {
        setTotalPages(1);
      }

      setIsLoading(false);
    } catch (error) {
      console.log("API Error:", error);
      setIsLoading(false);
    }
  };

  /* ---------------- RESET PAGE WHEN FILTER CHANGE ---------------- */

  useEffect(() => {
    setCurrentPage(1);
  }, [slug, categoryId, filterType, subCategory]);

  /* ---------------- MAIN FETCH ---------------- */

  useEffect(() => {
    console.log("Fetch triggered - slug:", slug, "categoryId:", categoryId, "filterType:", filterType, "subCategory:", subCategory, "currentPage:", currentPage);
    fetchProducts(currentPage);
  }, [slug, categoryId, filterType, subCategory, currentPage]);

  /* ---------------- RENDER ---------------- */

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {products?.length > 0 ? (
            <div className="grid lg:grid-cols-4 grid-cols-2 md:gap-4 gap-2.5">
              {products.map((v_product, index) => (
                <div
                  key={index}
                  className="group rounded-md bg-white border border-gray-300 overflow-hidden"
                >
                  <div className="relative w-full overflow-hidden">
                    <Link href={`/product/${v_product.slag_name}`}>
                      <img
                        src={v_product?.product_image}
                        className="hover:scale-110 duration-500 mx-auto mt-2 rounded-md cursor-pointer md:w-[200px] md:h-[200px] w-[120px] h-[120px]"
                        alt={v_product?.product_name}
                      />
                    </Link>
                  </div>

                  <div className="md:pt-4 pt-2">
                    <div className="md:h-12 h-14 w-[99%] mx-auto text-center mt-1">
                      <Link href={`/product/${v_product.slag_name}`}>
                        <h4 className="text-gray-800 text-sm hover:text-primary transition">
                          {v_product?.product_name}
                        </h4>
                      </Link>
                    </div>

                    <div className="flex justify-center space-x-2 h-6 px-2 md:mt-2 mt-4">
                      <p className="md:text-md text-sm text-primary font-semibold">
                        ৳{v_product?.sales_price}
                      </p>
                      <p className="text-sm text-gray-400 line-through">
                        ৳{v_product?.mrp_price}
                      </p>
                    </div>

                    <div className="p-2.5">
                      <AddToCart
                        productDetails={v_product}
                        buttonText="Add To Cart"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="font-bold text-red-600 text-2xl">
                No result found
              </div>
              <div>Please search again ...</div>
              <Image
                src={noResultFound}
                alt="No Result"
                className="h-[60%] w-[60%] mx-auto mt-10 rounded-md"
              />
            </div>
          )}
        </div>
      )}

      {/* ---------------- PAGINATION ---------------- */}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCart;