"use client"
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import Loader from "@/app/product/loader";
import AddToCart from "@/app/common/addToCart";
import {useDispatch, useSelector} from "react-redux";
import noResultFound from '../../public/No-Result-Found.jpg';
import {usePathname} from 'next/navigation';
import Image from "next/image";
import {categorySlag} from "@/app/redux/product/productSlice";


const AppURL = process.env.NEXT_PUBLIC_BASE_URL;

function ProductCart(props) {
    const {type} = props;
    const dispatch = useDispatch();
    const path = usePathname();
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const itemsPerPage = 15;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const categoryId = useSelector(state => state.products.categorySlag);
    const productName = useSelector(state => state.products.productName);

    const productListByCategory = (categoryId) => {
        const static_Url = AppURL + "product";
        fetch(static_Url, {
            method: "POST",
            body: JSON.stringify({
                ClientService: 'frontend-client',
                AuthKey: 'Babshahi',
                ContentType: 'application/json',
                shop_name: 'prosadhoni',
                category_id: categoryId,
                page: currentPage,
                limit: itemsPerPage,
            }),
        }).then(response => {
            response.json().then(res => {
                setTimeout(() => {
                    setIsLoading(false);
                    setProduct(res.products);
                }, 1000);
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    const productListByName = (productName) => {
        const static_Url = AppURL + "product_by_name";
        fetch(static_Url, {
            method: "POST",
            body: JSON.stringify({
                ClientService: 'frontend-client',
                AuthKey: 'Babshahi',
                ContentType: 'application/json',
                shop_name: 'prosadhoni',
                product_name: productName,
                page: currentPage,
                limit: itemsPerPage,
            }),
        }).then(response => {
            response.json().then(res => {
                setTimeout(() => {
                    setIsLoading(false);
                    setProduct(res.products);
                }, 1000);
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        if (categoryId !== "") {
            productListByCategory(categoryId)
        }
    }, [categoryId]);

    useEffect(() => {
        if ((type === 0) && (categoryId === "")) {
            productListByCategory(0)
        }
    }, [type, categoryId]);


    useEffect(() => {
        if (productName !== "") {
            productListByName(productName)
        }
    }, [productName]);

    useEffect(() => {
        if (path === '/') {
            dispatch(categorySlag(''));
            productListByCategory(0);
        }
    }, []);


    return (
        <div>
            {isLoading ?
                <Loader/>
                :
                <div>
                    {currentItems?.length > 0 ?
                        <div className="grid lg:grid-cols-5 grid-cols-2 md:gap-4 gap-2.5">
                            {currentItems?.map((v_product, index) => (
                                <div key={index}
                                     className="group rounded-md bg-white h-auto border border-gray-300 overflow-hidden">
                                    <div
                                        className="relative h-min w-full overflow-hidden inline-block">
                                        <Link href={`/product/${v_product.slag_name}`}>
                                            <img
                                                src={v_product?.product_image}
                                                className="hover:scale-125 duration-500 mx-auto rounded-md mt-2 transform transition cursor-pointer md:w-[200px] md:h-[200px] w-[120px] h-[120px]"/>
                                        </Link>
                                    </div>
                                    <div className="md:pt-4 pt-2">
                                        <div className="md:h-12 h-14 w-[99%] mx-auto text-center mt-1">
                                            <Link href={`/product/${v_product.slag_name}`}>
                                                <h4 className="text-gray-800 text-center text-sm hover:text-primary transition">
                                                    {v_product?.product_name}
                                                </h4>
                                            </Link>
                                        </div>
                                        <div className="flex flex-row md:space-x-2 space-x-1 h-6 px-2 md:mt-2 mt-4">
                                            <p className="md:text-md text-sm pl-[30%] text-primary font-roboto md:font-semibold">৳{v_product?.mrp_price}
                                            </p>
                                            <p className="text-sm text-gray-400 font-roboto line-through">৳{v_product?.sales_price}</p>
                                        </div>
                                        <div className="p-2.5">
                                            <AddToCart productDetails={v_product} buttonText="কার্টে রাখুন"/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div> :
                        <div>
                            {isLoading ? "" :
                                <div>
                                    <div className="text-center font-bold text-red-600 text-2xl">No result found</div>
                                    <div className="text-center">Please search again ...</div>
                                    <Image src={noResultFound} alt="offer Image"
                                           className="h-[60%] w-[60%] mx-auto mt-10 rounded-md"/>
                                </div>
                            }
                        </div>
                    }
                </div>
            }

            {currentItems?.length >= 15 ?
                <div className="flex justify-center mt-6 space-x-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                        Prev
                    </button>
                    {(() => {
                        const pageNumbers = [];
                        const maxPagesToShow = 5;
                        let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
                        let endPage = startPage + maxPagesToShow - 1;
                        if (endPage > totalPages) {
                            endPage = totalPages;
                            startPage = Math.max(endPage - maxPagesToShow + 1, 1);
                        }

                        for (let i = startPage; i <= endPage; i++) {
                            pageNumbers.push(i);
                        }

                        return pageNumbers.map((num) => (
                            <button
                                key={num}
                                onClick={() => setCurrentPage(num)}
                                className={`px-3 py-1 rounded ${
                                    currentPage === num ? 'bg-blue-500 text-white' : 'bg-gray-100'
                                }`}>
                                {num}
                            </button>
                        ));
                    })()}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                        Next
                    </button>
                </div> : ""}
        </div>
    );
}

export default ProductCart;