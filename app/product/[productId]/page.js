import React from 'react';
import product from "@/app/product/product";
import CartBody from "@/app/product/cartBody";

const getProduct = async () => {
    const AppURL = process.env.NEXT_PUBLIC_BASE_URL;
    const url = AppURL + "product";
    const result = await fetch(url, {
        next: {
            revalidate: 180
        },
        method: "POST",
        body: JSON.stringify({
            ClientService: 'frontend-client',
            AuthKey: 'Babshahi',
            ContentType: 'application/json',
            shop_name: 'prosadhoni',
            category_id: '',
        }),
    });
    if (result.status === 200) {
        return result.json();
    } else {
        throw new Error("Enternal server error");
    }
}

export default async function ProductDetails({params}) {
    const {productId} = params;
    return (
        <div className="md:container mt-10">
            <CartBody productId={productId}/>
        </div>
    );
}
