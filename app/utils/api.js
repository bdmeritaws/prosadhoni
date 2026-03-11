/**
 * API Utility for Prosadhoni E-commerce
 * Contains all API calls for categories, subcategories, and products
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://babshahi.com/Api/";

const COMMON_PARAMS = {
  ClientService: "frontend-client",
  AuthKey: "Babshahi",
  ContentType: "application/json",
  institute_id: "10",
};

const fetchAPI = async (endpoint, bodyParams = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://babshahi.com",
        Referer: "https://babshahi.com",
        "User-Agent": "Mozilla/5.0",
      },
      body: JSON.stringify({
        ...COMMON_PARAMS,
        ...bodyParams,
      }),
      cache: "no-store",
    });

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    return { success: false, error };
  }
};

/**
 * Get all main categories
 * Endpoint: category
 */
export const getMainCategories = async () => {
  return fetchAPI("category", {});
};

/**
 * Get individual category data by category ID
 * Endpoint: product_by_category
 * @param {string|number} categoryId - The category ID
 */
export const getCategoryProducts = async (categoryId, page = 1, limit = 15) => {
  return fetchAPI("product_by_category", {
    category_id: String(categoryId),
    page,
    limit,
  });
};

/**
 * Get all subcategories of a main category
 * Endpoint: subcategory
 * @param {string|number} mainCategoryId - The main category ID
 */
export const getSubcategories = async (mainCategoryId) => {
  return fetchAPI("subcategory", {
    main_category_id: String(mainCategoryId),
  });
};

/**
 * Get products by subcategory
 * Endpoint: product_by_subcategory
 * @param {string|number} subcategoryId - The subcategory ID
 */
export const getSubcategoryProducts = async (subcategoryId, page = 1, limit = 15) => {
  return fetchAPI("product_by_subcategory", {
    subcategory_id: String(subcategoryId),
    page,
    limit,
  });
};

/**
 * Get all categories (for shop by category section)
 * Endpoint: category
 */
export const getCategoryDetails = async () => {
  return fetchAPI("category", {});
};

/**
 * Search products by name
 * Endpoint: product_by_name
 * @param {string} productName - Search term
 */
export const searchProducts = async (productName, page = 1, limit = 15) => {
  return fetchAPI("product_by_name", {
    product_name: productName,
    page,
    limit,
  });
};

/**
 * Get top deal products
 * Endpoint: product_top_deal
 */
export const getTopDeals = async (page = 1, limit = 15) => {
  return fetchAPI("product_top_deal", {
    category_id: "",
    page,
    limit,
  });
};

/**
 * Get products under 99
 * Endpoint: product_under_99
 */
export const getUnder99Products = async (page = 1, limit = 15) => {
  return fetchAPI("product_under_99", {
    category_id: "",
    page,
    limit,
  });
};

/**
 * Get inventory subcategories (for shop by concern section)
 * Endpoint: inventory_subcategory
 */
export const getInventorySubcategories = async () => {
  return fetchAPI("inventory_subcategory", {});
};

/**
 * Get products by inventory subcategory (for shop by concern detail page)
 * Endpoint: product_by_inventory_subcategory
 * @param {string|number} subcategoryId - The subcategory ID
 */
export const getProductsByInventorySubcategory = async (subcategoryId, page = 1, limit = 15) => {
  return fetchAPI("product_by_inventory_subcategory", {
    subcategory_id: String(subcategoryId),
    page,
    limit,
  });
};

/**
 * Save product review
 * Endpoint: save_product_review
 * @param {string|number} productId - The product ID
 * @param {string} reviewerName - Reviewer's name
 * @param {string} review - Review text
 * @param {number} rating - Rating (1-5)
 * @param {File|string} reviewImage - File object or empty string
 */
export const saveProductReview = async (productId, reviewerName, review, rating, reviewImage = "") => {
  
  // If there's an image file, use FormData
  if (reviewImage instanceof File) {
    const formData = new FormData();
    formData.append('ClientService', 'frontend-client');
    formData.append('AuthKey', 'Babshahi');
    formData.append('ContentType', 'application/json');
    formData.append('institute_id', '10');
    formData.append('product_id', String(productId));
    formData.append('reviewer_name', reviewerName);
    formData.append('review', review);
    formData.append('rating', String(rating));
    formData.append('review_image', reviewImage);

    try {
      const response = await fetch(`${BASE_URL}save_product_review`, {
        method: "POST",
        headers: {
          Origin: "https://babshahi.com",
          Referer: "https://babshahi.com",
          "User-Agent": "Mozilla/5.0",
        },
        body: formData,
      });

      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error("API Error (save_product_review):", error);
      return { success: false, error };
    }
  }
  
  // No image - use JSON as before
  return fetchAPI("save_product_review", {
    product_id: String(productId),
    reviewer_name: reviewerName,
    review: review,
    rating: String(rating),
    review_image: "",
  });
};

/**
 * Generate URL-friendly slug from category name
 * @param {string} name - The category name
 * @returns {string} - URL-friendly slug
 */
export const generateSlug = (name) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

export default {
  getMainCategories,
  getCategoryProducts,
  getSubcategories,
  getSubcategoryProducts,
  getCategoryDetails,
  searchProducts,
  getTopDeals,
  getUnder99Products,
  getInventorySubcategories,
  getProductsByInventorySubcategory,
  generateSlug,
  saveProductReview,
};
