"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {deleteSingleProduct, modalCheckOrder, clearCart } from "@/app/redux/product/productSlice";
import { Trash } from "react-bootstrap-icons";
import CartButton from "@/app/product/cartButton";
import { useRouter } from "next/navigation";



function ModalOrderConfirmed(props) {
    const AppURL = process.env.NEXT_PUBLIC_BASE_URL;
    const router = useRouter();
    const dispatch = useDispatch();
    const checkModal = useSelector((state) => state.products.orderConfirmedModal);

    const handelClick = () => {
        dispatch(modalCheckOrder(false));
    }
    const [cartProduct, setCartProduct] = useState([]);
    const getCartProduct = useSelector((state) => state.products.productCart);
    useEffect(() => {
        setCartProduct(getCartProduct);
    }, [getCartProduct]);


    let total = 0;
    const [successMsg, setSuccessMsg] = useState("");
    const [deliveryCharge, setDeliveryCharge] = useState(60);
    const [customerName, setCustomerName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [address, setAddress] = useState("");
    const [addressCity, setAddressCity] = useState("");
    const [addressZone, setAddressZone] = useState("");
    const [addressArea, setAddressArea] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const orderPlace = () => {
        if ((deliveryCharge > 0) && (mobileNumber) && (customerName) && (address)) {
            if (mobileNumber.length > 10) {
                setErrorMsg("");
                const static_Url = AppURL + "customer_order_place";
                fetch(static_Url, {
                    method: "POST", body: JSON.stringify({
                        ClientService: 'frontend-client',
                        AuthKey: 'Babshahi',
                        ContentType: 'application/json',
                        deliveryCharge: deliveryCharge,
                        customerName: customerName,
                        mobileNumber: mobileNumber,
                        address: address,
                        addressCity: addressCity,
                        addressZone: addressZone,
                        addressArea: addressArea,
                        shop_name: "prosadhoni",
                        orderDetails: cartProduct,
                        total: total,
                    }),
                }).then(response => {
                    response.json().then(res => {
                        if (res.status === 200) {
                            setDeliveryCharge(0);
                            setCustomerName('');
                            setMobileNumber('');
                            setAddress('');
                            setSuccessMsg(res.message);

                            // 🔥 Clear Redux + localStorage
                            dispatch(clearCart());

                            // 🔥 Close modal
                            dispatch(modalCheckOrder(false));

                            setTimeout(() => {
                                router.push(`/order/${res?.order_number}`);
                            }, 1500);
                        }

                    });
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                setErrorMsg("মোবাইল নাম্বার সঠিক ভাবে লিখুন ");
            }
        } else {
            setErrorMsg("অর্ডারটি কনফার্ম করতে আপনার নাম, ঠিকানা, মোবাইল নাম্বার, সঠিক ভাবে লিখুন ");
        }
    }

    const handelDeliveryCharge = (val) => {
        setDeliveryCharge(val);
    }

    const [specialProduct, setSpecialProduct] = useState("");

    useEffect(() => {
        if (checkModal === true) {
            if (cartProduct?.length > 0) {
                const static_Url = AppURL + "special_product";
                fetch(static_Url, {
                    method: "POST",
                    body: JSON.stringify({
                        ClientService: 'frontend-client',
                        AuthKey: 'Babshahi',
                        ContentType: 'application/json',
                        orderDetails: cartProduct,
                    }),
                }).then(response => {
                    response.json().then(res => {
                        setSpecialProduct(res?.data?.productDetails[0]);
                    })
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }, [checkModal, cartProduct]);


    const deleteProduct = (product_slag) => {
        if (cartProduct?.length == 1) {
            dispatch(modalCheckOrder(false));
        }
        dispatch(deleteSingleProduct(product_slag));
    }

    return (
        <div>
            {checkModal ?
                <div className="fixed inset-0 z-[99999] bg-black/50 flex items-end md:items-center justify-center overflow-hidden">
                    <div
                        className="bg-white w-full md:w-full md:max-w-md rounded-t-2xl md:rounded-2xl shadow-2xl p-4 md:p-6 relative h-[85dvh] md:h-auto md:max-h-[90vh] overflow-y-auto mt-16 md:mt-0">

                        {/* Close Button */}
                        <button
                            onClick={handelClick}
                            className="absolute top-3 right-4 text-gray-400 hover:text-[#8F2C8C] text-2xl">
                            ✕
                        </button>

                        <div className="space-y-6">

                            {/* Title */}
                            <div className="text-center space-y-1">
                                <h2 className="text-lg font-bold text-[#8F2C8C]">
                                    ক্যাশ অন ডেলিভারিতে
                                </h2>
                                <h2 className="text-lg font-bold text-[#8F2C8C]">
                                    অর্ডার করতে আপনার তথ্য দিন
                                </h2>
                            </div>

                            {/* Inputs */}
                            <div className="space-y-4">
                                <input
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    type="text"
                                    placeholder="আপনার নাম"
                                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#8F2C8C] outline-none"
                                />

                                <input
                                    type="tel"
                                    placeholder="আপনার মোবাইল নাম্বার"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#8F2C8C] outline-none"
                                />

                                <input
                                    onChange={(e) => setAddress(e.target.value)}
                                    type="text"
                                    placeholder="আপনার সম্পূর্ণ ঠিকানা যেমন গ্রাম, থানা, জেলা"
                                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#8F2C8C] outline-none"
                                />
                            </div>

                            {/* Shipping */}
                            <div className="space-y-3">
                                <div className="text-base font-semibold text-gray-800">
                                    শিপিং এরিয়া
                                </div>

                                <label className="flex justify-between items-center border rounded-xl px-4 py-3 cursor-pointer hover:border-[#8F2C8C]">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            defaultChecked
                                            onClick={() => handelDeliveryCharge(60)}
                                            className="accent-[#8F2C8C]"
                                        />
                                        <span>ঢাকা সিটির ভিতরে</span>
                                    </div>
                                    <span className="font-semibold text-[#8F2C8C]">
                                        TK 60.00
                                    </span>
                                </label>

                                <label className="flex justify-between items-center border rounded-xl px-4 py-3 cursor-pointer bg-gray-50 hover:border-[#8F2C8C]">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            onClick={() => handelDeliveryCharge(120)}
                                            className="accent-[#8F2C8C]"
                                        />
                                        <span>ঢাকা সিটির বাইরে</span>
                                    </div>
                                    <span className="font-semibold text-[#8F2C8C]">
                                        TK 120.00
                                    </span>
                                </label>
                            </div>

                            {/* Cart Items */}
                            <div className="rounded-xl border overflow-hidden">
                                <table className="w-full text-sm">
                                    <tbody>
                                        {cartProduct.map((v_po, index) => {
                                            total += v_po?.qty * v_po?.price;
                                            return (
                                                <tr key={index}
                                                    className="border-b last:border-0 hover:bg-[#faf5fa] transition">

                                                    <td className="p-4">
                                                        <img
                                                            src={v_po?.product_image}
                                                            alt=""
                                                            className="w-14 h-14 object-cover rounded-lg border"
                                                        />
                                                    </td>

                                                    <td className="p-4">
                                                        <div className="font-medium text-gray-800">
                                                            {v_po?.product_name.substring(0, 20)}...
                                                        </div>

                                                        <div className="flex items-center gap-3 mt-2">
                                                            <div
                                                                onClick={() => deleteProduct(v_po?.product_slag)}
                                                                className="cursor-pointer text-red-500">
                                                                <Trash size={18} />
                                                            </div>

                                                            <CartButton
                                                                productId={v_po.product_slag}
                                                                cartProduct={cartProduct}
                                                                type={1}
                                                            />
                                                        </div>
                                                    </td>

                                                    <td className="p-4 text-right font-semibold text-[#8F2C8C]">
                                                        ৳ {v_po?.qty * v_po?.price}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Price Summary */}
                            <div className="bg-[#faf5fa] rounded-xl p-4 space-y-2 text-sm border">
                                <div className="flex justify-between">
                                    <span>সাব টোটাল</span>
                                    <span className="font-medium">TK {total}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>ডেলিভারি চার্জ</span>
                                    <span className="font-medium text-[#8F2C8C]">
                                        TK {deliveryCharge}
                                    </span>
                                </div>

                                <div className="flex justify-between font-bold text-base border-t pt-3 text-[#8F2C8C]">
                                    <span>সর্বমোট</span>
                                    <span>
                                        TK {parseInt(total) + parseInt(deliveryCharge)}
                                    </span>
                                </div>
                            </div>

                            {successMsg && (
                                <div className="text-center text-green-600">
                                    {successMsg}
                                </div>
                            )}

                            {errorMsg && (
                                <div className="text-center text-red-600">
                                    {errorMsg}
                                </div>
                            )}
                            {/* Confirm Button */}
                            <div className="space-y-3">
                                <button
                                    onClick={orderPlace}
                                    className="w-full bg-[#8F2C8C] hover:bg-[#6F1D6C] text-white py-3 rounded-xl font-semibold shadow-md transition">
                                    Buy Now
                                </button>

                                <p className="text-center text-[#8F2C8C] text-sm font-medium">
                                    উপরের বাটনে ক্লিক করলে আপনার অর্ডারটি সাথে সাথে কনফার্ম হয়ে যাবে
                                </p>
                            </div>


                        </div>
                    </div>
                </div>
                : ""}
        </div>
    );

}

export default ModalOrderConfirmed;