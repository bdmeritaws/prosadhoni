"use client"
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Telephone, Whatsapp, Messenger, Trash} from "react-bootstrap-icons";
import Loader from "@/app/product/loader";
import ProductCart from "@/app/product/productCart";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import AddToCart from "@/app/common/addToCart";

const AppURL = process.env.API_BASE_URL;

function CartBody(props) {
    const dispatch = useDispatch();
    const {productId} = props;
    const [productDetails, setProductDetails] = useState([]);
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const cartProduct = useSelector((state) => state.products.productCart);
    const category_slag = useSelector((state) => state?.products?.categorySlag);
    const [details, setDetails] = useState(0);

    useEffect(() => {
        setIsLoading(true)
        const static_Url = AppURL + "product";
        fetch(static_Url, {
            method: "POST", body: JSON.stringify({
                ClientService: 'frontend-client',
                AuthKey: 'Babshahi',
                ContentType: 'application/json',
                shop_name: 'prosadhoni',
                category_id: '',
            }),
        }).then(response => {
            response.json().then(res => {
                setProduct(res.products);
                const checkProduct = res.products?.find(findProductByProductId => findProductByProductId.slag_name === productId);
                if (checkProduct !== undefined) {
                    setProductDetails(checkProduct);
                    setIsLoading(false);
                }
            })
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        setDetails(category_slag)
        window.scrollTo(0, 0);
    }, []);

    const schema = JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": productDetails?.product_name,
        "image": productDetails?.product_image,
        "description": productDetails?.description,
        "brand": {
            "@type": "Brand", "name": productDetails?.brand_name
        },
        "sku": productDetails?.sku,
        "offers": {
            "@type": "Offer",
            "url": AppURL + "product/" + productDetails?.slag_name,
            "priceCurrency": "BDT",
            "price": productDetails?.mrp_price,
            "priceValidUntil": "2024-05-18",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": productDetails?.rating_value,
            "bestRating": productDetails?.best_rating,
            "worstRating": productDetails?.worst_rating,
            "ratingCount": productDetails?.rating_count
        }
    });
    const [viewDescription, setViewDescription] = useState(false);
    return (
        <div>
            <div>
                <script type="application/ld+json" dangerouslySetInnerHTML={{__html: schema}}/>
                <div className="md:grid md:grid-cols-3 gap-4">
                    <div>
                        <img src={productDetails?.product_image} alt={`Slide ${productDetails?.product_name}`}/>
                    </div>
                    <div className="col-span-2 mx-5 mt-10 md:mt-0">
                        <div className="font-bold text-lg">{productDetails?.product_name}</div>
                        <div className="flex flex-row gap-x-10 mt-4">
                            <div className="line-through font-bold text-xl">৳{productDetails?.mrp_price}</div>
                            <div className="text-xl">৳{productDetails?.sales_price}</div>
                        </div>

                        <div className="md:w-80 w-[100%] mt-5 h-10 bg-amber-500 pl-8 rounded-md">
                            <AddToCart productDetails={productDetails} buttonText="অর্ডার করুন"/>
                        </div>

                        <div className="md:w-80 w-[100%] mt-5 h-10 bg-green-600 rounded-md">
                            <AddToCart productDetails={productDetails} buttonText="কার্টে রাখুন"/>
                        </div>

                        <div
                            className="text-white items-center md:w-80 w-[100%] px-2.5 py-2 bg-black text-white mt-5 text-center rounded-md">
                            <div className="flex flex-row mx-auto w-48 gap-x-2">
                                <Messenger size={18} color="blue" className="mt-1"/>
                                <div>Chat With Us</div>
                            </div>
                        </div>

                        <div
                            className="text-white items-center md:w-80 w-[100%] px-2.5 py-2 mt-5 text-center rounded-md bg-black text-white">
                            <div className="flex flex-row mx-auto w-48 gap-x-2">
                                <Whatsapp size={18} color="green" className="mt-1"/>
                                <div>WhatsApp Us</div>
                            </div>
                        </div>

                        <div
                            className="text-white items-center md:w-80 w-[100%] px-2.5 bg-black text-white py-2 mt-5 text-center rounded-md">
                            <div className="flex flex-row mx-auto w-48 gap-x-2">
                                <Telephone size={18} color="blue" className="mt-1"/>
                                <div>+8801816 668 833</div>
                            </div>
                        </div>

                        <div className="mt-3 md:w-80 w-[100%]">
                            <div className="border-b py-1.5 border-gray-300 border-t border-gray-300"
                                 onClick={() => handelDeliveryCharge(60)}>
                                <div className="justify-between flex flex-row">
                                    <div>ঢাকার ভিতরে</div>
                                    <div>৳ 60</div>
                                </div>
                            </div>
                            <div className="border-b py-1.5 border-gray-300"
                                 onClick={() => handelDeliveryCharge(120)}>
                                <div className="justify-between flex flex-row">
                                    <div> ঢাকার বাহিরে</div>
                                    <div>৳ 120</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-10 mx-5">
                    <div className="flex flex-row justify-between">
                        <div>Product Details</div>
                        <div className="cursor-pointer">
                            {viewDescription ?
                                <svg onClick={() => setViewDescription(false)} xmlns="http://www.w3.org/2000/svg"
                                     width="16"
                                     height="16" fill="currentColor"
                                     className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                    <path
                                        d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                </svg>
                                :
                                <svg onClick={() => setViewDescription(true)} xmlns="http://www.w3.org/2000/svg"
                                     width="16"
                                     height="16" fill="currentColor"
                                     className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                </svg>
                            }
                        </div>
                    </div>
                    <div className="border-b border-gray-300 w-full"></div>
                    {viewDescription ?
                        <div className="border border-gray-300 p-3 rounded-md mt-2">
                            {productDetails?.description}
                        </div> : ""}
                </div>
            </div>
            <div className="mx-4">
                {isLoading ? <Loader/> : <ProductCart type={0}/>}
            </div>
        </div>);
}

export default CartBody;