"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AddToCart from "@/app/common/addToCart";

function RelatedProducts({ categoryId, currentProductSlug }) {
    const AppURL = process.env.NEXT_PUBLIC_BASE_URL;
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!categoryId) return;

        const fetchRelatedProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(AppURL + "product_by_category", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ClientService: "frontend-client",
                        AuthKey: "Babshahi",
                        ContentType: "application/json",
                        institute_id: 10,
                        category_id: categoryId,
                        limit: 8,
                    }),
                });

                const res = await response.json();
                // Filter out current product and show only first 8 products
                const filteredProducts = res?.products?.filter(
                    (item) => item.slag_name !== currentProductSlug
                ).slice(0, 8) || [];
                setProducts(filteredProducts);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching related products:", error);
                setIsLoading(false);
            }
        };

        fetchRelatedProducts();
    }, [categoryId]);

    if (isLoading) {
        return (
            <div className="grid lg:grid-cols-4 grid-cols-2 md:gap-4 gap-2.5">
                {[...Array(8)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                        <div className="bg-gray-200 h-[200px] rounded-md"></div>
                        <div className="bg-gray-200 h-4 mt-2 rounded w-3/4"></div>
                        <div className="bg-gray-200 h-4 mt-2 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
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
    );
}

export default RelatedProducts;
