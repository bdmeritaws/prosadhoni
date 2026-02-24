import Product from "@/app/product/product";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import SliderDetails from "@/app/page/sliderDetails";
import ModalSideBar from "@/app/common/modalSideBar";
import React from "react";
import ModalOrderConfirmed from "@/app/common/modalOrderConfirmed";

const AppURL = process.env.API_BASE_URL;
const getShopSlider = async () => {
    const url = AppURL + "shop_slider";
    const result = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            ClientService: 'frontend-client',
            AuthKey: 'Babshahi',
            ContentType: 'application/json',
            shop_name: 'prosadhoni',
        }),
    });
    if (result.status === 200) {
        return result.json();
    } else {
        throw new Error("Enternal server error");
    }
}

export default async function Home() {
    const response = await getShopSlider();
    return (
        <main>
            <SliderDetails images={response?.shop_slider}/>
            <Product/>
        </main>
    );
}
