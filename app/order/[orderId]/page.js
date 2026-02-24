"use client"
import React, {useEffect, useState} from 'react';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {modalCheckOrder} from "@/app/redux/product/productSlice";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";

const AppURL = process.env.API_BASE_URL;


function OrderDetails({params}) {
    const router = useRouter();
    const {orderId} = params;
    const [orderDetails, setOrderDetails] = useState();
    const [productDetails, setProductDetails] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(modalCheckOrder(false));
        const url = AppURL + "order_details";
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                ClientService: 'frontend-client',
                AuthKey: 'Babshahi',
                ContentType: 'application/json',
                order_id: orderId,
            }),
        }).then(response => {
            response.json().then(res => {
                setOrderDetails(res.order_details);
                setProductDetails(res.order_details?.details);
            })
        }).catch((error) => {
            console.log(error);
        });
    }, [orderId]);

    const handelContinue = () => {
        router.push(`/`);
    }

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;


    var total = 0;
    return (
        <div className="container">
            <div className="bg-white">
                <div className="h-10"></div>
                <div className="text-green-500 text-xl text-center">THANKS FOR YOUR ORDER</div>
                <div className="ml-10 mt-5">
                    <div className="space-y-2">
                        <div className="text-xl font-bold">আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে, আমাদের কল
                            সেন্টার থেকে ফোন করে আপনার অর্ডারটি কনফার্ম করা হবে
                        </div>
                    </div>

                    <div className="mt-8 space-y-2">
                        <div className="flex flex-row gap-x-2">
                            <div className="h-2 bg-green-600 w-2 rounded-full mt-2.5"></div>
                            <div className="text-xl font-bold">Order Number: {orderId}</div>
                        </div>
                        <div className="flex flex-row gap-x-2">
                            <div className="h-2 bg-green-600 w-2 rounded-full mt-2.5"></div>
                            <div className="text-xl font-bold">Payment Method: Cash on Delivery</div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="text-xl font-bold">বিশেষ দ্রষ্টব্যঃ ডেলিভারি ম্যান সামনে থাকা অবস্থায়
                            প্রোডাক্ট
                            চেক করে নিবেন।
                        </div>
                        <div className="text-xl font-bold">ডেলিভারি ম্যান চলে আসার পর কোন অভিযোগ গ্রহণযোগ্য নয়!
                        </div>
                    </div>

                    {/*12623*/}

                    <div>
                        <div className="text-xl font-bold mt-10">Order Datails</div>
                        <div className="mt-10 md:mt-0 md:w-[95%] p-2 md:text-lg text-sm">
                            <div className="font-bold text-xl">আপনার অর্ডার</div>

                            <div className="grid grid-cols-8 border-t border-b border-gray-300 space-y-2">
                                <div className="col-span-4 text-left">Product Name</div>
                                <div className="text-center">Price</div>
                                <div className="text-right col-span-2">Quantity</div>
                                <div className="text-right">Total</div>
                            </div>

                            {
                                productDetails?.map((v_cartProduct, index) => {
                                    total += v_cartProduct?.qty * v_cartProduct?.price;
                                    return (
                                        <div key={index}
                                             className="grid grid-cols-8 border-b border-gray-300 space-y-2">
                                            <div
                                                className="col-span-4 text-left flex flex-row">
                                                <div className="w-14 h-12">
                                                    <img src={v_cartProduct?.product_image}
                                                         className="h-12 w-14 p-1 rounded-md"/>
                                                </div>
                                                <div className="vertical-align: middle pl-5">
                                                    {v_cartProduct?.product_name}
                                                </div>
                                            </div>
                                            <div className="text-center pb-1.5">{v_cartProduct.price}</div>
                                            <div className="text-center col-span-2 pl-[66%]">{v_cartProduct.qty}</div>
                                            <div className="text-right">
                                                {v_cartProduct.qty * v_cartProduct.price}
                                            </div>
                                        </div>
                                    );
                                })}
                            <div className="grid grid-cols-8 border-b border-gray-300 my-3">
                                <div className="col-span-7 text-right">Sub Total</div>
                                <div className="text-center col-span-1 text-right">৳{total}</div>
                            </div>

                            <div className="grid grid-cols-8 border-b border-gray-300 my-3">
                                <div className="col-span-7 text-right">
                                    (
                                    {(orderDetails?.amount_to_collect - total) === 60 ?
                                        "ঢাকার ভিতরে ডেলিভারি চার্জ" :
                                        "ঢাকার বাহিরে ডেলিভারি চার্জ"
                                    })
                                </div>
                                <div
                                    className="text-center col-span-1 text-right">
                                    ৳ {orderDetails?.amount_to_collect - total}.00
                                </div>
                            </div>
                            <div className="grid grid-cols-8 border-b border-gray-300 my-3">
                                <div className="col-span-7 text-right">Total</div>
                                <div className="text-center col-span-1 text-right">৳ {orderDetails?.amount_to_collect}.00
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row flex-1 gap-x-5">

                        <div onClick={handelContinue}
                             className="bg-green-600 p-2 text-white cursor-pointer rounded-md">Shopping
                            continue..
                        </div>

                    </div>
                    <div className="h-10"></div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;