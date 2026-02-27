"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "@/app/product/loader";
import AddToCart from "@/app/common/addToCart";
import { useSelector } from "react-redux";
import noResultFound from "../../public/No-Result-Found.jpg";
import Image from "next/image";

function ProductCart({ slug, filterType }) {
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

      let url = "";
      let bodyData = {
        ClientService: "frontend-client",
        AuthKey: "Babshahi",
        ContentType: "application/json",
        shop_name: "prosadhoni",
        page: page,
        limit: itemsPerPage,
      };

      // Handle filter type (top_deals, under_99)
      if (filterType === "top_deals") {
        url = AppURL + "product_top_deal";
        bodyData.category_id = "";
      } else if (filterType === "under_99") {
        url = AppURL + "product_under_99";
        bodyData.category_id = "";
      } else if (slug) {
        // 🔥 URL SLUG PRIORITY - for search
        url = AppURL + "product_by_name";
        bodyData.product_name = slug;
      } else {
        url = AppURL + "product";
        bodyData.category_id = categoryId || 0;
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Origin": typeof window !== 'undefined' ? window.location.origin : "https://babshahi.com",
          "Referer": typeof window !== 'undefined' ? window.location.href : "https://babshahi.com",
        },
        body: JSON.stringify(bodyData),
        cache: "no-store",
      });

      const res = await response.json();

      setProducts(res?.products || []);

      if (res?.total) {
        setTotalPages(Math.ceil(res.total / itemsPerPage));
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
  }, [slug, categoryId, filterType]);

  /* ---------------- MAIN FETCH ---------------- */

  useEffect(() => {
    console.log("Fetch triggered - slug:", slug, "categoryId:", categoryId, "filterType:", filterType, "currentPage:", currentPage);
    fetchProducts(currentPage);
  }, [slug, categoryId, filterType, currentPage]);

  /* ---------------- RENDER ---------------- */

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {products?.length > 0 ? (
            <div className="grid lg:grid-cols-5 grid-cols-2 md:gap-4 gap-2.5">
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