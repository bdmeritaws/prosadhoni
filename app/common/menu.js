"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Bag, Person, Search } from "react-bootstrap-icons";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { categorySlag, productName } from "@/app/redux/product/productSlice";
import { useRouter, usePathname } from "next/navigation";

const LOGO_URL =
  "https://babshahi.s3.ap-south-1.amazonaws.com/category/logo-prosadhoni.webp";

function Menu({ category }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const cartProduct = useSelector((state) => state.products.productCart);
  const [totalCart, setTotalCart] = useState(0);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  // ================= CART COUNT =================
  useEffect(() => {
    setTotalCart(cartProduct?.length || 0);
  }, [cartProduct]);

  // ================= CLEAR SEARCH WHEN GO HOME =================
  useEffect(() => {
    if (pathname === "/") {
      setSearch("");
    }
  }, [pathname]);

  // ================= AUTO FOCUS ON SEARCH PAGE =================
  useEffect(() => {
    if (pathname.startsWith("/search")) {
      inputRef.current?.focus();
    }
  }, [pathname]);

  // ================= DEBOUNCED SEARCH =================
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search.trim().length >= 1) {
        dispatch(productName(search));
        router.push(`/search/${search}`);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleSearch = () => {
    if (search.trim().length >= 1) {
      dispatch(productName(search));
      router.push(`/search/${search}`);
    }
  };

  const handelMenu = (id) => {
    dispatch(categorySlag(id));
    router.push(id === "0" ? "/" : `/category/${id}`);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden">
        {/* Top Bar */}
        <div className="bg-[#8F2C8C] h-14 flex items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={LOGO_URL}
              alt="Prosadhoni Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
            <span className="text-white text-lg font-semibold tracking-wide">
              Prosadhoni
            </span>
          </Link>

          <div className="flex items-center gap-4 text-white">
            <Link href="/account">
              <Person size={22} />
            </Link>

            <Link href="/cart" className="relative">
              <Bag size={22} />
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalCart}
              </span>
            </Link>
          </div>
        </div>

        {/* Categories + Search */}
        <div className="bg-white px-3 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="relative w-[120px] flex-shrink-0">
              <div className="flex items-center justify-center gap-1 h-11 bg-gray-100 rounded-md text-sm font-medium text-gray-700 px-2">
                ☰ Categories
              </div>

              <select
                className="absolute inset-0 opacity-0 cursor-pointer w-full"
                onChange={(e) => handelMenu(e.target.value)}
              >
                <option value="0">Categories</option>
                {category?.map((cat, i) => (
                  <option key={i} value={cat.id}>
                    {cat.main_category_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="flex flex-1 h-11 bg-gray-100 rounded-md overflow-hidden">
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products"
                className="flex-1 px-3 bg-transparent outline-none text-sm text-gray-700 min-w-0"
              />

              <button
                onClick={handleSearch}
                className="px-4 bg-[#6F1D6C] text-white flex items-center justify-center flex-shrink-0"
              >
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden md:block bg-[#8F2C8C] shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-[64px]">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={LOGO_URL}
                alt="Prosadhoni Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
              <span className="text-xl font-semibold tracking-wide text-white">
                Prosadhoni
              </span>
            </Link>

            {/* Search Area */}
            <div className="flex items-center bg-white rounded-md overflow-hidden w-[560px] h-[40px] shadow-sm">
              <div className="relative flex items-center gap-2 px-3 border-r text-gray-700 text-sm cursor-pointer">
                ☰ Categories
                <select
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handelMenu(e.target.value)}
                >
                  <option value="0">Categories</option>
                  {category?.map((cat, i) => (
                    <option key={i} value={cat.id}>
                      {cat.main_category_name}
                    </option>
                  ))}
                </select>
              </div>

              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search for "beauty products"'
                className="flex-1 h-full px-3 text-sm text-gray-700 outline-none"
              />

              <button
                onClick={handleSearch}
                className="h-full px-4 bg-[#6F1D6C] text-white flex items-center gap-1 text-sm"
              >
                <Search size={14} />
                Search
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/cart"
                className="relative flex items-center gap-2 bg-white text-[#8F2C8C] px-4 h-[36px] rounded-md text-sm font-medium"
              >
                <Bag size={16} />
                My Cart
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                  {totalCart}
                </span>
              </Link>

              <Link
                href="/account"
                className="flex items-center gap-2 bg-white text-[#8F2C8C] px-4 h-[36px] rounded-md text-sm font-medium"
              >
                <Person size={16} />
                Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Menu;