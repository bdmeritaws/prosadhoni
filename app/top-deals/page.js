"use client";

import React from 'react';
import ProductCart from "@/app/product/productCart";

function TopDealsPage() {
    return (
        <div>
            <ProductCart filterType="top_deals"/>
        </div>
    );
}

export default TopDealsPage;
