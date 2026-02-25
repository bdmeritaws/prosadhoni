"use client"
import React, {useEffect, useState} from 'react';
import {modalCheckOrder} from "@/app/redux/product/productSlice";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";


function OrderDetails({params}) {
    const AppURL = process.env.NEXT_PUBLIC_BASE_URL;
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
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

                {/* Success Header */}
                <div className="text-center space-y-3">
                    <div className="text-2xl font-bold text-[#8F2C8C]">
                        THANKS FOR YOUR ORDER
                    </div>

                    <div className="text-lg font-semibold text-gray-700">
                        আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে, আমাদের কল
                        সেন্টার থেকে ফোন করে আপনার অর্ডারটি কনফার্ম করা হবে
                    </div>
                </div>

                {/* Order Info */}
                <div className="mt-10 space-y-4 border-t pt-6">
                    <div className="flex items-center gap-3 text-lg font-semibold">
                        <div className="h-3 w-3 bg-[#8F2C8C] rounded-full"></div>
                        Order Number: {orderId}
                    </div>

                    <div className="flex items-center gap-3 text-lg font-semibold">
                        <div className="h-3 w-3 bg-[#8F2C8C] rounded-full"></div>
                        Payment Method: Cash on Delivery
                    </div>
                </div>

                {/* Notice */}
                <div className="mt-10 bg-[#faf5fa] border border-[#8F2C8C] rounded-xl p-6 space-y-2">
                    <div className="font-semibold text-gray-800">
                        বিশেষ দ্রষ্টব্যঃ ডেলিভারি ম্যান সামনে থাকা অবস্থায় প্রোডাক্ট চেক করে নিবেন।
                    </div>
                    <div className="font-semibold text-gray-800">
                        ডেলিভারি ম্যান চলে আসার পর কোন অভিযোগ গ্রহণযোগ্য নয়!
                    </div>
                </div>

                {/* Order Details */}
                <div className="mt-12">
                    <div className="text-xl font-bold text-[#8F2C8C] mb-6">
                        Order Details
                    </div>

                    <div className="overflow-x-auto border rounded-xl">
                        <table className="w-full text-sm">
                            <thead className="bg-[#8F2C8C] text-white">
                            <tr>
                                <th className="text-left p-4">Product</th>
                                <th className="text-center p-4">Price</th>
                                <th className="text-center p-4">Quantity</th>
                                <th className="text-right p-4">Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                productDetails?.map((v_cartProduct, index) => {
                                    total += v_cartProduct?.qty * v_cartProduct?.price;
                                    return (
                                        <tr key={index}
                                            className="border-b hover:bg-[#faf5fa] transition">

                                            <td className="p-4 flex items-center gap-4">
                                                <img
                                                    src={v_cartProduct?.product_image}
                                                    className="h-14 w-14 rounded-lg border object-cover"
                                                />
                                                <span className="font-medium">
                                                        {v_cartProduct?.product_name}
                                                    </span>
                                            </td>

                                            <td className="text-center p-4">
                                                ৳ {v_cartProduct.price}
                                            </td>

                                            <td className="text-center p-4">
                                                {v_cartProduct.qty}
                                            </td>

                                            <td className="text-right p-4 font-semibold text-[#8F2C8C]">
                                                ৳ {v_cartProduct.qty * v_cartProduct.price}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary */}
                    <div className="mt-8 bg-gray-50 border rounded-xl p-6 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span>Sub Total</span>
                            <span className="font-medium">৳ {total}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>
                                {(orderDetails?.amount_to_collect - total) === 60 ?
                                    "ঢাকার ভিতরে ডেলিভারি চার্জ" :
                                    "ঢাকার বাহিরে ডেলিভারি চার্জ"}
                            </span>
                            <span className="font-medium">
                                ৳ {orderDetails?.amount_to_collect - total}.00
                            </span>
                        </div>

                        <div className="flex justify-between border-t pt-4 font-bold text-base text-[#8F2C8C]">
                            <span>Total</span>
                            <span>৳ {orderDetails?.amount_to_collect}.00</span>
                        </div>
                    </div>
                </div>

                {/* Continue Button */}
                <div className="mt-10 text-center">
                    <button
                        onClick={handelContinue}
                        className="bg-[#8F2C8C] hover:bg-[#6F1D6C] text-white px-8 py-3 rounded-xl font-semibold shadow-md transition">
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );

}

export default OrderDetails;