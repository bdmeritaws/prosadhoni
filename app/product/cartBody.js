"use client";

import React, { useEffect, useState } from "react";
import Loader from "@/app/product/loader";
import AddToCart from "@/app/common/addToCart";
import RelatedProducts from "@/app/product/relatedProducts";
import { Messenger, Whatsapp, Telephone } from "react-bootstrap-icons";

function CartBody({ productId }) {

  const AppURL = process.env.NEXT_PUBLIC_BASE_URL;

  const [zoomStyle, setZoomStyle] = useState({});
  const [isZoomed, setIsZoomed] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");

  /* ================= FETCH PRODUCT ================= */

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const response = await fetch(AppURL + "product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ClientService: "frontend-client",
            AuthKey: "Babshahi",
            ContentType: "application/json",
            institute_id: 10,
            category_id: "",
          }),
        });

        const res = await response.json();

        const foundProduct = res.products?.find(
          (item) => item.slag_name === productId
        );

        if (foundProduct) {
          setProductDetails(foundProduct);
        }

        setIsLoading(false);

      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);

  }, [productId]);

  if (isLoading) return <Loader />;

  if (!productDetails) {
    return (
      <div className="text-center mt-20 text-red-600 text-xl">
        Product Not Found
      </div>
    );
  }

  /* ================= DISCOUNT ================= */

  const discount =
    productDetails.mrp_price && productDetails.sales_price
      ? Math.round(
          ((productDetails.mrp_price - productDetails.sales_price) /
            productDetails.mrp_price) *
            100
        )
      : 0;

  /* ================= IMAGE ZOOM ================= */

  const handleMouseMove = (e) => {

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });

  };

  return (

    <div className="container mx-auto px-4 mt-10">

      {/* ================= PRODUCT SECTION ================= */}

      <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded-lg shadow-sm">

        {/* ================= PRODUCT IMAGE ================= */}

        <div
          className="border rounded-lg p-6 flex justify-center items-center overflow-hidden"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => {
            setIsZoomed(false);
            setZoomStyle({ transform: "scale(1)" });
          }}
          onMouseMove={handleMouseMove}
          onClick={() => setShowPreview(true)}
        >

          <img
            src={productDetails.product_image}
            alt={productDetails.product_name}
            className="object-contain max-h-[350px] transition-transform duration-200"
            style={isZoomed ? zoomStyle : { transform: "scale(1)" }}
          />

          {showPreview && (
            <div
              className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
              onClick={() => setShowPreview(false)}
            >
              <img
                src={productDetails.product_image}
                alt="Preview"
                className="max-h-[90vh] max-w-[90vw] object-contain"
              />
            </div>
          )}

        </div>

        {/* ================= PRODUCT DETAILS ================= */}

        <div>

          <h1 className="text-2xl font-semibold text-gray-800">
            {productDetails.product_name}
          </h1>

          {/* Rating */}

          <div className="flex items-center mt-3 space-x-2">
            <div className="text-yellow-500 text-lg">★★★★☆</div>
            <span className="text-sm text-gray-500">
              ({productDetails.rating_count || 4} Ratings)
            </span>
          </div>

          {/* Price */}

          <div className="mt-4">

            <span className="text-3xl font-bold text-[#8F2C8C]">
              ৳ {productDetails.sales_price}
            </span>

            <span className="ml-3 text-lg line-through text-gray-400">
              ৳ {productDetails.mrp_price}
            </span>

            {discount > 0 && (
              <span className="ml-3 text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                {discount}% OFF
              </span>
            )}

          </div>

          {/* ================= ACTION BUTTONS ================= */}

          <div className="mt-6 space-y-3">

            {/* Add to Cart + Buy Now */}

            <div className="grid grid-cols-2 gap-3">

              <AddToCart
                productDetails={productDetails}
                buttonText="Add to Cart"
              />

              <AddToCart
                productDetails={productDetails}
                buttonText="Buy Now"
              />

            </div>

            {/* Messenger + WhatsApp */}

            <div className="grid grid-cols-2 gap-3">

              <a
                href="https://m.me/prosadhoninew"
                target="_blank"
                rel="noopener noreferrer"
                className="border rounded-md py-3 flex justify-center items-center gap-2"
              >
                <Messenger size={18} color="#1877F2" />
                Chat With Us
              </a>

              <a
                href={`https://wa.me/8801727123480?text=${encodeURIComponent(
                  `Hi, I want to know about ${productDetails.product_name}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border rounded-md py-3 flex justify-center items-center gap-2"
              >
                <Whatsapp size={18} color="green" />
                WhatsApp Us
              </a>

            </div>

            {/* Phone */}

            <a
              href="tel:+8801727123480"
              className="bg-gray-100 rounded-md py-3 flex justify-center items-center gap-2 text-green-600 font-semibold"
            >
              <Telephone size={18} />
              +8801727123480
            </a>

          </div>

        </div>

      </div>

      {/* ================= DELIVERY INFO ================= */}

      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 text-center mt-6 bg-gray-100 p-4 rounded-md text-sm">

        <div>🔁 <strong>Return:</strong> 3 day</div>
        <div>🔄 <strong>Exchange:</strong> 3 day</div>
        <div>🚚 <strong>Delivery Time:</strong> 2 day</div>
        <div>💵 <strong>Payment:</strong> COD Available</div>

      </div>

      {/* ================= TABS ================= */}

      <div className="mt-8">

        <div className="flex flex-wrap gap-3 justify-center mb-4">

          {[
            { key: "description", label: "Description" },
            { key: "reviews", label: "Reviews" },
            { key: "howto", label: "How To Use" },
            { key: "qa", label: "Q&A" },
          ].map((tab) => (

            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-2 rounded-md text-sm font-medium
              ${
                activeTab === tab.key
                  ? "bg-[#8F2C8C] text-white"
                  : "bg-gray-200 text-gray-700 border border-[#8F2C8C]"
              }`}
            >
              {tab.label}
            </button>

          ))}

        </div>

        <div className="bg-gray-50 border rounded-md p-6 text-gray-700">

          {activeTab === "description" && (
            <div>{productDetails.description}</div>
          )}

          {activeTab === "reviews" && (
            <div>No reviews yet.</div>
          )}

          {activeTab === "howto" && (
            <div>Use daily for best results.</div>
          )}

          {activeTab === "qa" && (
            <div>No questions available.</div>
          )}

        </div>

      </div>

      {/* ================= RELATED PRODUCTS ================= */}

      <div className="mt-10">

        <RelatedProducts
          categoryId={productDetails.category_id}
          currentProductSlug={productDetails.slag_name}
        />

      </div>

    </div>

  );
}

export default CartBody;