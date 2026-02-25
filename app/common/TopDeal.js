"use client";

import { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import AddToCart from "./addToCart";
import Link from "next/link";
import Loader from "@/app/product/loader";

const AppURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function TopDeal() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${AppURL}product_top_deal`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ClientService: "frontend-client",
            AuthKey: "Babshahi",
            ContentType: "application/json",
            shop_name: "prosadhoni",
            category_id: ""
          })
        });

        const data = await response.json();
        console.log("TopDeal API Response:", data);

        if (data.status === 200) {
          setProducts(data.products || []);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching top deals:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 mt-12">
        <SectionHeader title="Top Deal" href="/top-deals" />
        <div className="text-center py-8 text-gray-500">
          No products found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-12">
      <SectionHeader title="Top Deal" href="/top-deals" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.slice(0, 10).map((product) => (
          <div key={product.id} className="group rounded-md bg-white h-auto border border-gray-300 overflow-hidden">
            <div className="relative h-min w-full overflow-hidden inline-block">
              <Link href={`/product/${product.slag_name}`}>
                <img
                  src={product?.product_image}
                  alt={product?.product_name}
                  className="hover:scale-125 duration-500 mx-auto rounded-md mt-2 transform transition cursor-pointer md:w-[200px] md:h-[200px] w-[120px] h-[120px]"
                />
              </Link>
            </div>
            <div className="md:pt-4 pt-2">
              <div className="md:h-12 h-14 w-[99%] mx-auto text-center mt-1">
                <Link href={`/product/${product.slag_name}`}>
                  <h4 className="text-gray-800 text-center text-sm hover:text-primary transition">
                    {product?.product_name}
                  </h4>
                </Link>
              </div>
              <div className="flex flex-row md:space-x-2 space-x-1 h-6 px-2 md:mt-2 mt-4">
                <p className="md:text-md text-sm pl-[30%] text-primary font-roboto md:font-semibold">
                  ৳{product?.sales_price}
                </p>
                <p className="text-sm text-gray-400 font-roboto line-through">
                  ৳{product?.mrp_price}
                </p>
              </div>
              <div className="p-2.5">
                <AddToCart productDetails={product} buttonText="Add To Cart" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
