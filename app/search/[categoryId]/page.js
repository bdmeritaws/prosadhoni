"use client"
import React from 'react';
import Product from "@/app/product/product";

function Search({params}) {
    return (
        <div>
            <Product slug={params?.categoryId}/>
        </div>
    );
}

export default Search;