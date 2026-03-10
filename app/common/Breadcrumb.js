"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House } from "react-bootstrap-icons";

// Route configuration - maps URL patterns to breadcrumb paths
const routeConfig = {
  "cart": { label: "Shopping Cart", path: "/cart", parent: "home" },
  "order": { label: "Order Details", path: "/order", parent: null },
  "top-deals": { label: "Top Deals", path: "/top-deals", parent: "home" },
  "products": { label: "Products", path: null, parent: "home" },
  "under-99": { label: "Under 99", path: "/products/under-99", parent: "home" },
};

export default function Breadcrumb() {
  const pathname = usePathname();
  
  // Don't show breadcrumb on home page
  if (pathname === "/" || pathname === "") return null;

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

  // Handle different route patterns
  if (segments[0] === "cart") {
    breadcrumbs.push({ label: "Shopping Cart", path: "/cart" });
  }
  else if (segments[0] === "order") {
    breadcrumbs.push({ label: "Order Details", path: null });
  }
  else if (segments[0] === "top-deals") {
    breadcrumbs.push({ label: "Top Deals", path: "/top-deals" });
  }
  else if (segments[0] === "products" && segments[1] === "under-99") {
    breadcrumbs.push({ label: "Under 99", path: "/products/under-99" });
  }
  else if (segments[0] === "search") {
    breadcrumbs.push({ label: "Search Results", path: null });
  }
  else if (segments[0] === "product") {
    // Product routes: /product/[productId] or /product/category/...
    if (segments[1] === "category") {
      // Category page: /product/category/[categoryId] or /product/category/[categoryId]/[subcategoryId]
      if (segments[2]) {
        // Main category
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
    else {
      // Product details: /product/[productId]
      breadcrumbs.push({ label: "Product Details", path: null });
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
    return "Product Details";
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
