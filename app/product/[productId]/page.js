import React from 'react';
import product from "@/app/product/product";
import CartBody from "@/app/product/cartBody";

const getProduct = async () => {
    const AppURL = process.env.NEXT_PUBLIC_BASE_URL;

    if (!AppURL) {
        throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
    }

    const url = AppURL + "product";

    const result = await fetch(url, {
        next: { revalidate: 180 },
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ClientService: 'frontend-client',
            AuthKey: 'Babshahi',
            ContentType: 'application/json',
            shop_name: 'prosadhoni',
            category_id: '',
        }),
    });

    if (!result.ok) {
        throw new Error("Internal server error");
    }

    return result.json();
};

export default async function ProductDetails({params}) {
    const {productId} = params;
    return (
        <div className="md:container mt-10">
            <CartBody productId={productId}/>
        </div>
    );
}
