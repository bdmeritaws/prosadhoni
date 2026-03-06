import React from "react";
import ShopByCategory from "@/app/common/shopByCategory";
import ShopByConcern from "@/app/common/shopByConcern";
import ShopUnderPrice from "./common/ShopUnderPrice";
import Features from "./common/Features";
import TopDeal from "./common/TopDeal";

/* -----------------------------
   Shop Slider API
--------------------------------*/
// const getShopSlider = async () => {
//   try {
//     const AppURL = process.env.NEXT_PUBLIC_BASE_URL;
//     const url = `${AppURL}shop_slider`;

//     const result = await fetch(url, {
//       method: "POST",
//       cache: "no-store",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         ClientService: "frontend-client",
//         AuthKey: "Babshahi",
//         ContentType: "application/json",
//         institute: 10,
//       }),
//     });

//     if (!result.ok) {
//       console.error("API Error Status:", result.status);
//       return null;
//     }

//     const data = await result.json();
//     return data;

//   } catch (error) {
//     console.error("Fetch Error:", error);
//     return null;
//   }
// };


/* -----------------------------
   Category API
--------------------------------*/
// const getShopSlider1 = async () => {
//   try {
//     const url = "https://admin.huzaiacademy.com/api/category";

//     const result = await fetch(url, {
//       method: "POST",
//       cache: "no-store",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         ClientService: "frontend-client",
//         AuthKey: "Biddapit",
//         ContentType: "application/json",
//       }),
//     });

//     if (!result.ok) {
//       console.error("Category API Error:", result.status);
//       return null;
//     }

//     const data = await result.json();
//     return data;

//   } catch (error) {
//     console.error("Category Fetch Error:", error);
//     return null;
//   }
// };


/* -----------------------------
   Home Page
--------------------------------*/
export default async function Home() {

//   const sliderResponse = await getShopSlider();
//   const categoryResponse = await getShopSlider1();

//   console.log("Slider Response:", sliderResponse);
//   console.log("Category Response:", categoryResponse);

  return (
    <main>

      {/* Slider */}
      {/* <SliderDetails images={sliderResponse?.shop_slider}/> */}

      {/* Category */}
      <ShopByCategory />

      {/* Concern */}
      <ShopByConcern />

      {/* Under Price */}
      <ShopUnderPrice />

      {/* Top Deal */}
      <TopDeal />

      {/* Features */}
      <Features />

    </main>
  );
}