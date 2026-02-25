import React from "react";
import ShopByCategory from "@/app/common/shopByCategory";
import ShopByConcern from "@/app/common/shopByConcern";
import ShopUnderPrice from "./common/ShopUnderPrice";

import Features from "./common/Features";
import TopDeal from "./common/TopDeal";


const getShopSlider = async () => {
    const AppURL = process.env.NEXT_PUBLIC_BASE_URL;
    const url = AppURL + "shop_slider";
    const result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Origin": "https://babshahi.com",
            "Referer": "https://babshahi.com",
            "User-Agent": "Mozilla/5.0"
        },
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

const getShopSlider1 = async () => {
    const url = "https://admin.huzaiacademy.com/api/category";
    const result = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            ClientService: 'frontend-client',
            AuthKey: 'Biddapit',
            ContentType: 'application/json',
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
    // const response1 = await getShopSlider1();
    // console.log("response=====",response);
    // console.log("asdfsd=====",response1);

    return (
        <main>
            {/* <SliderDetails images={response?.shop_slider}/> */}
            <ShopByCategory/>
            <ShopByConcern/>
            {/* <TopBrand/> */}
            <ShopUnderPrice/>
            <TopDeal/>
            <Features/>
            {/* <Product/> */}
        </main>
    );
}
