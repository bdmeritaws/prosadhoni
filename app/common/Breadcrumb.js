"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House } from "react-bootstrap-icons";
import { useEffect, useState } from "react";

export default function Breadcrumb() {
  const pathname = usePathname();
  
  // Don't show breadcrumb on home page
  if (pathname === "/" || pathname === "") return null;

  // Don't show main breadcrumb on product detail pages
  // ProductBreadcrumb component handles those
  if (pathname.startsWith("/product/") && pathname.split("/").length === 3) {
    return null;
  }

  // Generate breadcrumbs based on pathname
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <div className="container mx-auto px-4 py-3">
      <nav aria-label="breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1">
          <li className="flex items-center">
            <Link 
              href="/" 
              className="text-[#8F2C8C] hover:text-[#7a257a] flex items-center gap-1 transition-colors"
            >
              <House size={14} />
              Home
            </Link>
          </li>

          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <li key={crumb.path || index} className="flex items-center">
                <span className="mx-2 text-gray-400">›</span>
                {isLast ? (
                  <span className="text-gray-700 font-medium">{crumb.label}</span>
                ) : crumb.path ? (
                  <Link 
                    href={crumb.path} 
                    className="text-[#8F2C8C] hover:text-[#7a257a] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#8F2C8C]">{crumb.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}

function generateBreadcrumbs(pathname) {
  const segments = pathname.split("/").filter((segment) => segment);
  const breadcrumbs = [];

  // Handle product detail page - fetch product data
  if (segments[0] === "product" && segments.length === 2 && !isNaN(segments[1])) {
    // For numeric product IDs, we'll handle this with dynamic data
    breadcrumbs.push({ label: "Products", path: null });
    breadcrumbs.push({ label: "Loading...", path: null });
    return breadcrumbs;
  }

  // Handle product detail page with slug
  if (segments[0] === "product" && segments.length === 2) {
    // Product slug - need to show category and product name
    breadcrumbs.push({ label: "Products", path: null });
    // This will be replaced by dynamic data in the component
    breadcrumbs.push({ label: "Product Details", path: null });
    return breadcrumbs;
  }

  // Handle cart
  if (segments[0] === "cart") {
    breadcrumbs.push({ label: "Shopping Cart", path: "/cart" });
  }
  // Handle order
  else if (segments[0] === "order") {
    breadcrumbs.push({ label: "Order Details", path: null });
  }
  // Handle top-deals
  else if (segments[0] === "top-deals") {
    breadcrumbs.push({ label: "Top Deals", path: "/top-deals" });
  }
  // Handle under-99
  else if (segments[0] === "products" && segments[1] === "under-99") {
    breadcrumbs.push({ label: "Under 99", path: "/products/under-99" });
  }
  // Handle search
  else if (segments[0] === "search") {
    breadcrumbs.push({ label: "Search Results", path: null });
  }
  // Handle product routes
  else if (segments[0] === "product") {
    if (segments[1] === "category") {
      // Category page: /product/category/[categoryId] or /product/category/[categoryId]/[subcategoryId]
      if (segments[2]) {
        // Main category - format the slug to readable name
        const categoryName = formatCategoryName(segments[2]);
        breadcrumbs.push({ label: categoryName, path: `/product/category/${segments[2]}` });
        
        // Subcategory if exists
        if (segments[3]) {
          const subcategoryName = formatCategoryName(segments[3]);
          breadcrumbs.push({ label: subcategoryName, path: null });
        }
      }
    }
    else if (segments[1] === "shop-by-concern") {
      // Shop by concern: /product/shop-by-concern/[subcategorySlug]
      breadcrumbs.push({ label: "Shop by Concern", path: null });
      if (segments[2]) {
        const concernName = formatCategoryName(segments[2]);
        breadcrumbs.push({ label: concernName, path: null });
      }
    }
  }
  else {
    // For any other routes, format the segment name
    segments.forEach((segment) => {
      breadcrumbs.push({ 
        label: formatCategoryName(segment), 
        path: null 
      });
    });
  }

  return breadcrumbs;
}

function formatCategoryName(segment) {
  // If it's a numeric ID, return a generic label
  if (/^\d+$/.test(segment)) {
    return "Products";
  }
  
  // Check predefined labels
  const labelMap = {
    "cart": "Shopping Cart",
    "order": "Order Details",
    "orderconfirmed": "Order Confirmed",
    "top-deals": "Top Deals",
    "under-99": "Under 99",
    "search": "Search Results",
    "shop-by-concern": "Shop by Concern",
    "category": "Products",
    "product": "Products",
  };

  if (labelMap[segment.toLowerCase()]) {
    return labelMap[segment.toLowerCase()];
  }

  // Otherwise, capitalize the segment
  return segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}
