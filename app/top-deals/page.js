"use client";

import React from 'react';
import ProductCart from "@/app/product/productCart";

function TopDealsPage() {
    return (
        <div className="container mx-auto px-4 mt-10">
            <ProductCart filterType="top_deals"/>
        </div>
    );
}

export default TopDealsPage;
