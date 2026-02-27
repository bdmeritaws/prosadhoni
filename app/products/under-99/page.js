"use client";

import React from 'react';
import ProductCart from "@/app/product/productCart";

function Under99Page() {
    return (
        <div>
            <ProductCart filterType="under_99"/>
        </div>
    );
}

export default Under99Page;
