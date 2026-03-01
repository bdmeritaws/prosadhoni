"use client"
import React from 'react';
import ProductCart from "@/app/product/productCart";

function CategoryPage({params}) {
    return (
        <div className='container mt-7'>
            <ProductCart slug={params?.categoryId} filterType="category"/>
        </div>
    );
}

export default CategoryPage;
