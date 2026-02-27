import React from 'react';
import ProductCart from "@/app/product/productCart";

function Product({slug}) {
    return (
        <>
            <div className="container mt-7">
                <ProductCart slug={slug}/>
            </div>
        </>
    );
}

export default Product;