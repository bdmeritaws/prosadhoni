"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Bag, Person, Search, X } from "react-bootstrap-icons";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { categorySlag, productName } from "@/app/redux/product/productSlice";
import { useRouter, usePathname } from "next/navigation";
import { getMainCategories, generateSlug } from "@/app/utils/api";

const LOGO_URL =
  "https://babshahi.s3.ap-south-1.amazonaws.com/category/logo-prosadhoni.webp";

function Menu({ category }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const cartProduct = useSelector((state) => state.products.productCart);

  const [totalCart, setTotalCart] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [menuCategories, setMenuCategories] = useState(category || []);

  const inputRef = useRef(null);
  const searchRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const desktopDropdownRef = useRef(null);
  const mobileCategoryRef = useRef(null);
  const desktopCategoryRef = useRef(null);

  // Helper to check if we're on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // ================= CART COUNT =================
  useEffect(() => {
    setTotalCart(cartProduct?.length || 0);
  }, [cartProduct]);

  // ================= FETCH CATEGORIES IF NOT PROVIDED =================
  useEffect(() => {
    const fetchCategories = async () => {
      // If categories were passed via props, use them
      if (category && category.length > 0) {
        setMenuCategories(category);
        return;
      }
      
      // Otherwise fetch them
      try {
        const response = await getMainCategories();
        if (response.success && response.data?.category) {
          setMenuCategories(response.data.category);
        }
      } catch (error) {
        console.error("Error fetching categories in menu:", error);
      }
    };

    fetchCategories();
  }, [category]);

  // ================= CLEAR SEARCH WHEN HOME =================
  useEffect(() => {
    if (pathname === "/") {
      setSearch("");
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [pathname]);

  // ================= CLICK OUTSIDE TO CLOSE DROPDOWN =================
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Determine which dropdown is active based on screen size
      const activeDropdown = window.innerWidth < 768 ? mobileDropdownRef.current : desktopDropdownRef.current;
      const activeCategory = window.innerWidth < 768 ? mobileCategoryRef.current : desktopCategoryRef.current;

      // Don't close if clicking on category select (native dropdown)
      if (event.target.tagName === 'SELECT' || event.target.tagName === 'OPTION') {
        return;
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        activeDropdown &&
        !activeDropdown.contains(event.target) &&
        activeCategory &&
        !activeCategory.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    // Support both mouse and touch events for mobile
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // ================= BODY SCROLL LOCK (Mobile only) =================
  useEffect(() => {
    if (showDropdown && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDropdown]);

  // ================= LIVE SEARCH =================
  useEffect(() => {
    const fetchSearchResults = async () => {
      const searchTerm = search.trim();

      if (searchTerm.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}product_by_name`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ClientService: "frontend-client",
              AuthKey: "Babshahi",
              ContentType: "application/json",
              shop_name: "prosadhoni",
              product_name: searchTerm,
            }),
          }
        );

        const data = await response.json();
        const products = data?.products || [];
        setSearchResults(products.slice(0, 8));
        setShowDropdown(true);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounce = setTimeout(fetchSearchResults, 400);
    return () => clearTimeout(debounce);
  }, [search]);

  const handleSearch = () => {
    if (search.trim()) {
      dispatch(productName(search));
      router.push(`/search/${search}`);
      setShowDropdown(false);
    }
  };

  const handleResultClick = (slug) => {
    console.log('[DEBUG handleResultClick] Called with slug:', slug);
    console.log('[DEBUG handleResultClick] Current showDropdown:', showDropdown);
    console.log('[DEBUG handleResultClick] Current search:', search);
    router.push(`/product/${slug}`);
    setShowDropdown(false);
    setSearch("");
  };

  const handleCategoryChange = (id, name = "Categories") => {
    console.log('[DEBUG] handleCategoryChange called:', id, name);
    setSelectedCategory(name);
    setShowDropdown(false); // Close search dropdown when category is selected

    // Convert name to slug for the URL
    const slug = id === "0" ? "0" : generateSlug(name);
    dispatch(categorySlag(slug));
    if (id === "0") {
      router.push("/");
    } else {
      router.push(`/product/category/${slug}`);
    }
  };

  return (
    <header className="sticky top-0 z-[100] overflow-visible">

      {/* ================= MOBILE ================= */}
      <div className="md:hidden">
        {/* Top Bar */}
        <div className="bg-[#8F2C8C] h-14 flex items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src={LOGO_URL} alt="Logo" width={32} height={32} />
            <span className="text-white font-semibold">Prosadhoni</span>
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

        {/* Search Bar */}
        <div className="bg-white px-3 py-3 shadow-sm" ref={searchRef}>
          <div className="flex items-center gap-2">
            {/* Category Dropdown */}
            <div className="relative w-[100px] flex-shrink-0" ref={mobileCategoryRef}>
              <div className="flex items-center justify-center h-11 bg-gray-100 rounded-lg text-sm font-medium px-2 truncate">
                ☰ {selectedCategory}
              </div>

              <select
                className="absolute inset-0 opacity-0 cursor-pointer w-full z-10"
                onClick={(e) => {
                  console.log('[DEBUG] Mobile select onClick:', e.target.value);
                  const select = e.target;
                  if (select.value && select.value !== '0') {
                    const option = select.options[select.selectedIndex];
                    handleCategoryChange(select.value, option.text);
                  }
                }}
                onChange={(e) => {
                  console.log('[DEBUG] Mobile select onChange:', e.target.value);
                  const option = e.target.options[e.target.selectedIndex];
                  handleCategoryChange(e.target.value, option.text);
                }}
                value=""
              >
                <option value="0">Categories</option>
                {menuCategories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.main_category_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="flex h-11 bg-gray-100 rounded-lg overflow-hidden">
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onFocus={() => search.length >= 2 && setShowDropdown(true)}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 px-3 bg-transparent outline-none text-sm"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />

                <button
                  onClick={handleSearch}
                  className="px-4 bg-[#6F1D6C] text-white"
                >
                  <Search size={18} />
                </button>
              </div>

              {/* Loading Indicator */}
              {isSearching && (
                <div className="absolute right-14 top-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#8F2C8C]"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE SEARCH RESULTS OVERLAY */}
        {showDropdown && (
          <div
            ref={mobileDropdownRef}
            className="fixed left-0 right-0 top-[112px] bottom-0 bg-white z-[9999] overflow-y-auto shadow-xl"
          >
            {/* Header with close button */}
            <div className="sticky top-0 bg-white border-b p-3 flex justify-between items-center">
              <h3 className="font-semibold text-gray-700">
                {searchResults.length} products found
              </h3>
              <button
                onPointerUp={(e) => {
                  if (e.pointerType) {
                    setShowDropdown(false);
                  }
                }}
                style={{ touchAction: 'manipulation' }}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Results */}
            <div className="p-2">
              {isSearching ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8F2C8C] mx-auto mb-2"></div>
                  <p>Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slag_name}`}
                      onClick={() => {
                        setShowDropdown(false);
                        setSearch("");
                      }}
                      style={{ touchAction: 'manipulation' }}
                      className="flex items-center gap-3 p-3 border-b hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <img
                        src={product.product_image}
                        alt={product.product_name}
                        className="w-16 h-16 object-contain rounded-lg bg-gray-100"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/64";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 line-clamp-2">
                          {product.product_name}
                        </p>
                        <p className="text-[#8F2C8C] font-bold text-base mt-1">
                          ৳{product.sales_price}
                        </p>
                      </div>
                    </Link>
                  ))}

                  <div className="border-t mt-2">
                    <Link
                      href={`/search/${search}`}
                      onClick={() => {
                        setShowDropdown(false);
                        setSearch("");
                      }}
                      className="flex items-center justify-center gap-1 py-4 text-[15px] font-medium text-[#8F2C8C] hover:bg-gray-50"
                    >
                      <span className="text-gray-600">View all results for</span>
                      <span className="font-bold text-[#8F2C8C]">"{search}"</span>
                    </Link>
                  </div>
                </>
              ) : search.length >= 2 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-lg mb-2">😕</p>
                  <p>No products found for "{search}"</p>
                  <p className="text-sm mt-2">Try checking your spelling or use a different word</p>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Type at least 2 characters to search</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block bg-[#8F2C8C] shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-[64px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image src={LOGO_URL} alt="Logo" width={40} height={40} />
              <span className="text-white text-xl font-semibold">
                Prosadhoni
              </span>
            </Link>

            {/* Desktop Search with Live Results */}
            <div ref={searchRef} className="relative">
              <div className="flex items-center bg-white rounded-lg w-[500px] lg:w-[560px] h-[44px]">
                {/* Category Dropdown */}
                <div className="relative h-full" ref={desktopCategoryRef}>
                  <div className="flex items-center gap-2 px-3 lg:px-4 h-full border-r text-gray-700 text-sm cursor-pointer whitespace-nowrap">
                    ☰ {selectedCategory}
                  </div>
                  <select
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                    onClick={(e) => {
                      const select = e.target;
                      if (select.value && select.value !== '0') {
                        const option = select.options[select.selectedIndex];
                        handleCategoryChange(select.value, option.text);
                      }
                    }}
                    onChange={(e) => {
                      const option = e.target.options[e.target.selectedIndex];
                      handleCategoryChange(e.target.value, option.text);
                    }}
                    value=""
                  >
                    <option value="0">Categories</option>
                    {menuCategories?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.main_category_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search Input */}
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => search.length >= 2 && setShowDropdown(true)}
                    placeholder="Search products..."
                    className="flex-1 px-3 lg:px-4 text-sm outline-none w-full h-[44px]"
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />

                  {/* Loading / Clear */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {isSearching ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#8F2C8C]"></div>
                    ) : search ? (
                      <button
                        onClick={() => {
                          setSearch("");
                          setSearchResults([]);
                          inputRef.current?.focus();
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={18} />
                      </button>
                    ) : null}
                  </div>

                  {/* Desktop Search Dropdown */}
                  {showDropdown && (
                    <div
                      ref={desktopDropdownRef}
                      className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-[9999] max-h-96 overflow-y-auto mt-1"
                    >
                      {isSearching ? (
                        <div className="p-4 text-center text-sm text-gray-500">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#8F2C8C] mx-auto mb-2"></div>
                          <p>Searching...</p>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <>
                          {searchResults.map((product) => (
                            <div
                              key={product.id}
                              onClick={() => handleResultClick(product.slag_name)}
                              className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b last:border-b-0"
                            >
                              <img
                                src={product.product_image}
                                alt={product.product_name}
                                className="w-12 h-12 object-contain rounded-lg bg-gray-100"
                                onError={(e) => {
                                  e.target.src = "https://via.placeholder.com/48";
                                }}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-800 truncate font-medium">
                                  {product.product_name}
                                </p>
                                <p className="text-sm text-[#8F2C8C] font-bold">
                                  ৳{product.sales_price}
                                </p>
                              </div>
                            </div>
                          ))}
                          <div
                            onClick={handleSearch}
                            className="p-4 text-center text-sm text-[#8F2C8C] hover:bg-gray-50 cursor-pointer font-medium border-t"
                          >
                            View all results for <span className="font-bold">{search}</span>
                          </div>
                        </>
                      ) : search.length >= 2 ? (
                        <div className="p-4 text-center text-sm text-gray-500">
                          <p className="mb-1">No products found for "{search}"</p>
                          <p className="text-xs text-gray-400">Try a different search term</p>
                        </div>
                      ) : (
                        <div className="p-4 text-center text-sm text-gray-500">
                          Type at least 2 characters to search
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="px-4 lg:px-6 bg-[#6F1D6C] text-white h-full rounded-r-lg flex items-center gap-1 hover:bg-[#5a1757] transition-colors"
                >
                  <Search size={16} />
                  <span className="hidden lg:inline">Search</span>
                </button>
              </div>
            </div>

            {/* Cart & Account */}
            <div className="flex items-center gap-3">
              <Link href="/cart" className="relative">
                <div className="bg-white px-4 h-[36px] flex items-center rounded-md text-[#8F2C8C] hover:bg-gray-100 transition-colors">
                  <Bag size={16} /> 
                  <span className="ml-2 font-medium">Cart {totalCart}</span>
                </div>
                {totalCart > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                    {totalCart > 9 ? '9+' : totalCart}
                  </span>
                )}
              </Link>

              <Link href="/account">
                <div className="bg-white px-4 h-[36px] flex items-center rounded-md text-[#8F2C8C] hover:bg-gray-100 transition-colors">
                  <Person size={16} />
                  <span className="ml-2 hidden lg:inline">Account</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Menu;
