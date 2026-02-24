"use client"
import React, {useEffect, useState} from 'react';
import {Bag, Person, Search, X} from 'react-bootstrap-icons';
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {categorySlag, productName} from "@/app/redux/product/productSlice";
import {usePathname, useRouter} from "next/navigation";


function Menu({category}) {
    const router = useRouter();
    const path = usePathname();
    const dispatch = useDispatch();
    const [totalCart, setTotalCart] = useState(0);
    const cartProduct = useSelector((state) => state.products.productCart);
    const categorySlug = useSelector((state) => state.products.categorySlag);

    useEffect(() => {
        setTotalCart(cartProduct?.length);
    }, [cartProduct]);
    const [isOpen, setIsOpen] = useState(false)

    const handelMenu = (id) => {
        dispatch(categorySlag(id));
        if (id === 0) {
            router.push(`/`);
        } else {
            router.push(`/search/${id}`);
        }
    }

    const [searchBox, setSearchBox] = useState(false);
    const [search, setSearch] = useState('');

    const handleSearch = (value) => {
        setSearch(value);
        const len = value.trim().length;
        if (len >= 3 && len % 3 === 0) {
            dispatch(productName(value));
            router.push(`/search/${value}`);
        }
    };

    const clearSearch = () => {
        setSearch('');
        router.push(`/`);
    };

    useEffect(() => {
        if (search === "") {
            router.push(`/`);
        }
    }, [search]);

    return (
        <div>
            <header className="shadow-sm bg-pink-100 lg:bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="bg-[#FC8934] h-16 text-white md:pt-5 pt-2 text-center">
                    আমাদের যে কোনো পণ্য অর্ডার করতে কল বা WhatsApp করুন: 📞 01816-667755
                </div>
                {searchBox ?
                    <div className="md:container flex flex-row items-center justify-between md:mt-2 mt-0">
                        <div className="relative w-full max-w-md mx-auto">
                            <input
                                type="text"
                                placeholder="Search Product"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="h-10 w-full pl-2 pr-10 outline-1 rounded-md border border-gray-300"/>
                            <button
                                onClick={clearSearch}
                                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-red-600">
                                <X size={20} onClick={() => setSearchBox(false)}/>
                            </button>
                        </div>
                    </div>
                    :
                    <div className="container flex flex-row items-center justify-between mt-2">
                        <div className="text-[#FBCF71]">
                            <button
                                className="md:hidden focus:outline-none"
                                onClick={() => setIsOpen(!isOpen)}>
                                <svg className="w-6 h-6"
                                     fill="none"
                                     stroke="currentColor"
                                     viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            </button>
                            <div className="hidden md:block">
                                <Search className="cursor-pointer" size={20} onClick={() => setSearchBox(true)}/>
                            </div>
                        </div>
                        <div className="text-[#FBCF71]">
                            <Link href="/">
                                Prosadhoni
                            </Link>
                        </div>
                        <div className="flex flex-row gap-x-2">
                            <div className="block md:hidden">
                                <Search className="text-[#FBCF71]" size={20} onClick={() => setSearchBox(true)}/>
                            </div>
                            <Link href="/cart"
                                  className="text-center text-gray-700 hover:text-primary transition relative">
                                <div
                                    className="absolute -right-2 -top-1 w-4 h-4 bg-[#FBCF71] rounded-full flex items-center justify-center text-white text-xs">
                                    {totalCart}
                                </div>
                                <div className="text-2xl text-[#FBCF71]">
                                    <Bag size={20} className="mx-auto"/>
                                </div>
                            </Link>
                            <Link href=""
                                  className="text-[#FBCF71] text-center text-gray-700 hover:text-primary transition">
                                <div className="text-2xl">
                                    <Person size={23} className="mx-auto"/>
                                </div>
                            </Link>
                        </div>
                    </div>
                }
                <div className="bg-[#F3F3F3] h-12 pt-2 mt-5 hidden md:block">
                    <div
                        className="flex flex-row gap-x-[5%] cursor-pointer items-center justify-center mx-auto w-[80%]">
                        <div onClick={() => handelMenu(0)}>All</div>
                        {category?.map((v_category, index) => (
                            <div onClick={() => handelMenu(v_category?.category_slug)}
                                 className={categorySlug == v_category?.category_slug ? "bg-[#FC8934] p-1 rounded-md px-2 text-white" : ""}
                                 style={{fontSize: 15}}
                                 key={index}> {v_category?.main_category_name}
                            </div>
                        ))}
                    </div>
                </div>
                {isOpen && (
                    <div className="mt-3 md:hidden space-y-2 cursor-pointer border-t border-green-50">
                        <div className="w-full p-2 space-y-2">
                            {category?.map((v_category, index) => (
                                <div onClick={() => handelMenu(v_category?.category_slug)} className="h-6"
                                     style={{fontSize: 15}}
                                     key={index}>{v_category?.main_category_name}</div>
                            ))}
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
}

export default Menu;