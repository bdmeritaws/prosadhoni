"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { getMainCategories, generateSlug } from "@/app/utils/api";

export default function ProductBreadcrumb({ productDetails }) {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch categories if productDetails doesn't have category info
  useEffect(() => {
    const fetchCategories = async () => {
      // Only fetch if productDetails doesn't have category info
      if (productDetails && (productDetails.main_category_name || productDetails.category_name)) {
        setLoading(false);
        return;
      }
      
      try {
        const result = await getMainCategories();
        if (result?.data?.category) {
          setCategories(result.data.category);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, [productDetails]);

  // Don't show breadcrumb on home page
  if (pathname === "/" || pathname === "") return null;

  // Generate breadcrumbs based on pathname and product data
  const breadcrumbs = generateBreadcrumbs(pathname, productDetails, categories);

  // Show loading state only for product pages
  if (loading && pathname.startsWith("/product/") && pathname.split("/").length === 3) {
    return (
      <div className="container mx-auto">
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
            <li className="flex items-center">
              <span className="mx-2 text-gray-400">›</span>
              <span className="text-gray-400">Loading...</span>
            </li>
          </ol>
        </nav>
      </div>
    );
  }

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

function generateBreadcrumbs(pathname, productDetails, categories) {
  const segments = pathname.split("/").filter((segment) => segment);
  const breadcrumbs = [];

  // Handle product detail page
  if (segments[0] === "product" && segments.length === 2) {
    const productSlug = segments[1];
    
    // Check if product details are available
    if (productDetails) {
      // Try multiple possible field names for category
      let categoryName = 
        productDetails.main_category_name || 
        productDetails.category_name || 
        productDetails.category?.name ||
        productDetails.main_category?.name ||
        null;
      
      let categorySlug = 
        productDetails.category_slug || 
        productDetails.main_category_slug || 
        productDetails.category?.slug ||
        productDetails.main_category?.slug ||
        productDetails.main_category_id ||
        productDetails.category_id ||
        null;

      // Also check for category_id numeric field
      const categoryId = productDetails.category_id || productDetails.main_category_id || null;

      // If category not found in productDetails, try to match with categories
      if ((!categoryName || !categorySlug) && categories.length > 0) {
        // First, try to find by category ID if available
        if (categoryId) {
          const foundById = categories.find(cat => String(cat.id) === String(categoryId));
          if (foundById) {
            categoryName = foundById.main_category_name;
            categorySlug = foundById.category_slug || generateSlug(foundById.main_category_name);
          }
        }
        
        // If still not found, try word matching
        if (!categoryName && !categorySlug) {
          const productNameLower = (productDetails.product_name || "").toLowerCase();
          const productWords = productNameLower.split(/\s+/);
          
          for (const cat of categories) {
            const catNameLower = (cat.main_category_name || "").toLowerCase();
            const catSlugLower = (cat.category_slug || "").toLowerCase();
            
            // Check if category name is in product name or any word matches
            for (const word of productWords) {
              // Remove special characters from word
              const cleanWord = word.replace(/[^a-z0-9]/g, '');
              const cleanCatName = catNameLower.replace(/[^a-z0-9]/g, '');
              const cleanCatSlug = catSlugLower.replace(/[^a-z0-9]/g, '');
              
              if (cleanWord.length > 2 && (cleanCatName.includes(cleanWord) || cleanCatSlug.includes(cleanWord) || cleanWord.includes(cleanCatName))) {
                categoryName = cat.main_category_name;
                categorySlug = cat.category_slug || generateSlug(cat.main_category_name);
                break;
              }
            }
            if (categoryName) break;
          }
        }
      }
      
      // Get product name
      const productName = productDetails.product_name || productSlug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
      
      // If category info is available, add it
      if (categoryName && categorySlug) {
        breadcrumbs.push({ label: categoryName, path: `/product/category/${categorySlug}` });
      }
      
      // Add product name at the end
      breadcrumbs.push({ label: productName, path: null });
    } else {
      // No product details - format the product slug from URL
      const productName = productSlug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
      breadcrumbs.push({ label: productName, path: null });
    }
    return breadcrumbs;
  }

  // Handle other routes
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
    if (segments[1] === "category") {
      if (segments[2]) {
        const categoryName = formatCategoryName(segments[2]);
        breadcrumbs.push({ label: categoryName, path: `/product/category/${segments[2]}` });
        
        if (segments[3]) {
          const subcategoryName = formatCategoryName(segments[3]);
          breadcrumbs.push({ label: subcategoryName, path: null });
        }
      }
    }
    else if (segments[1] === "shop-by-concern") {
      breadcrumbs.push({ label: "Shop by Concern", path: null });
      if (segments[2]) {
        const concernName = formatCategoryName(segments[2]);
        breadcrumbs.push({ label: concernName, path: null });
      }
    }
  }

  return breadcrumbs;
}

function formatCategoryName(segment) {
  if (/^\d+$/.test(segment)) {
    return "Products";
  }
  
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

  return segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}
