"use client"
import React, {useEffect, useState} from 'react';
import {Trash} from 'react-bootstrap-icons';
import {useDispatch, useSelector} from "react-redux";
import CartButton from "@/app/product/cartButton";
import {deleteSingleProduct, modalCheckOrder} from "@/app/redux/product/productSlice";
import {useRouter} from "next/navigation";


function OrderConfirmed(props) {
    const AppURL = process.env.NEXT_PUBLIC_BASE_URL;
    const router = useRouter();
    const dispatch = useDispatch();
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoding, setIsLoding] = useState(true);
    const [cartProduct, setCartProduct] = useState([]);
    const [city, setCity] = useState([]);
    const [zone, setZone] = useState([]);
    const [area, setArea] = useState([]);
    const getCartProduct = useSelector((state) => state.products.productCart);

    useEffect(() => {
        setCartProduct(getCartProduct);
    }, [getCartProduct]);


    var total = 0;

    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [customerName, setCustomerName] = useState("");
    const [mobileNumber, setMobileNumber] = useState(0);
    const [address, setAddress] = useState("");
    const [addressCity, setAddressCity] = useState("");
    const [addressZone, setAddressZone] = useState("");
    const [addressArea, setAddressArea] = useState("");

    const orderPlace = () => {
        if ((deliveryCharge > 0) && (mobileNumber) && (customerName) && (address) && (addressCity)) {
            setIsLoding(false);
            const static_Url = AppURL + "customer_order_place";
            fetch(static_Url, {
                method: "POST",
                body: JSON.stringify({
                    ClientService: 'frontend-client',
                    AuthKey: 'Babshahi',
                    ContentType: 'application/json',
                    deliveryCharge: deliveryCharge,
                    address: address,
                    customerName: customerName,
                    mobileNumber: mobileNumber,
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
                        setIsLoding(true);
                        setSuccessMsg(res.message);
                        localStorage.removeItem("product");
                        setInterval(function () {
                            router.push(`/order/${res?.order_number}`);
                        }, 2000);
                    }
                });
            }).catch((error) => {
                console.log(error);
            });
        } else {
            setErrorMsg("অর্ডারটি কনফার্ম করতে আপনার নাম, ঠিকানা, মোবাইল নাম্বার, সঠিক ভাবে লিখুন ");
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        const static_Url = AppURL + "select_city";
        fetch(static_Url, {
            method: "POST",
            body: JSON.stringify({
                ClientService: 'frontend-client',
                AuthKey: 'Babshahi',
                ContentType: 'application/json',
                access_token: token,
            }),
        }).then(response => {
            response.json().then(res => {
                setCity(res?.city);
            })
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        if (addressCity) {
            const token = localStorage.getItem("token");
            const static_Url = AppURL + "select_zone";
            fetch(static_Url, {
                method: "POST",
                body: JSON.stringify({
                    ClientService: 'frontend-client',
                    AuthKey: 'Babshahi',
                    ContentType: 'application/json',
                    access_token: token,
                    city_id: addressCity,
                }),
            }).then(response => {
                response.json().then(res => {
                    setZone(res?.zone);
                })
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [addressCity]);

    useEffect(() => {
        if (addressZone) {
            const token = localStorage.getItem("token");
            const static_Url = AppURL + "select_area";
            fetch(static_Url, {
                method: "POST",
                body: JSON.stringify({
                    ClientService: 'frontend-client',
                    AuthKey: 'Babshahi',
                    ContentType: 'application/json',
                    access_token: token,
                    zone_id: addressZone
                }),
            }).then(response => {
                response.json().then(res => {
                    setArea(res?.area);
                })
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [addressZone]);

    const deleteProduct = (product_slag) => {
        dispatch(deleteSingleProduct(product_slag));
    }

    const orderConfirmed = () => {
        dispatch(modalCheckOrder(true));
    }

    return (
        <div className="container">
            <div className="min-h-screen bg-white mt-5 border border rounded-md shadow-md">
                {/* Header */}
                <div className="bg-[#8F2C8C] w-full text-white py-6 px-8 shadow">
                    <h1 className="text-2xl font-bold">Shopping Cart</h1>
                    <div className="text-sm mt-1">
                        <span className="opacity-70">Home</span> &gt; <span>Your Shopping Cart</span>
                    </div>
                </div>

                {/* Cart Items */}
                <div className="max-w-5xl mx-auto p-6">
                    <div className="grid grid-cols-4 gap-4 font-bold border-b pb-2 text-sm text-gray-700">
                        <div className="col-span-2">Products</div>
                        <div>Price</div>
                        <div>Quantity</div>
                    </div>

                    {cartProduct.map((v_cartProduct, idx) => {
                        total += v_cartProduct?.qty * v_cartProduct?.price;
                        return (
                            <div key={idx} className="md:grid md:grid-cols-4 gap-1 items-center py-4 border-b">
                                <div className="col-span-2 flex items-center gap-4">
                                    <img src={v_cartProduct?.product_image} className="h-12 w-14 pb-1"/>
                                    <div>
                                        <h3 className="md:font-semibold md:text-[16] text-[12px]">{v_cartProduct?.product_name}</h3>

                                        <div className="block md:hidden flex flex-row justify-between">
                                            <div onClick={() => deleteProduct(v_cartProduct?.product_slag)}
                                                 className="mt-2.5 cursor-pointer"><Trash size={16}
                                                                                          color="red"/>
                                            </div>
                                            <div className="text-black text-[14px] pt-2">Tk {v_cartProduct?.price}</div>
                                            <div className="flex items-center gap-2 text-[12px]">
                                                <CartButton productId={v_cartProduct.product_slag}
                                                            cartProduct={cartProduct}
                                                            type={1}/>
                                            </div>
                                        </div>

                                        <div onClick={() => deleteProduct(v_cartProduct?.product_slag)}
                                             className="mt-3.5 cursor-pointer hidden md:block"><Trash size={20}
                                                                                                      color="red"/>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="text-gray-800 font-semibold hidden md:block">Tk {v_cartProduct?.price}</div>
                                <div className="flex items-center gap-2 hidden md:block">
                                    <CartButton productId={v_cartProduct.product_slag} cartProduct={cartProduct}
                                                type={1}/>
                                </div>

                            </div>
                        );
                    })}

                    {/* Note, Coupon, Summary */}
                    <div className="flex flex-wrap justify-between items-center mt-6 gap-4">
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                            {/*<div className="flex items-center gap-2 cursor-pointer">*/}
                            {/*    📝 <span>Note</span>*/}
                            {/*</div>*/}
                            {/*<div className="flex items-center gap-2 cursor-pointer">*/}
                            {/*    🎟️ <span>Coupon</span>*/}
                            {/*</div>*/}
                        </div>

                        <div className="text-right space-y-1 text-sm">
                            <div className="flex justify-between gap-4">
                                <span className="font-medium">Subtotal</span>
                                <span>Tk {parseInt(total) + parseInt(deliveryCharge)}</span>
                            </div>
                            {/*<p className="text-gray-500">Taxes and Shipping Calculated at Checkout</p>*/}
                            <button onClick={orderConfirmed}
                                    type="submit"
                                    className="bg-[#8F2C8C] text-white rounded-sm border-0 shadow-md text-[14px] font-medium md:px-6 px-2 py-3 animate-shake-loop">
                                🛒 ক্যাশ অন ডেলিভারিতে অর্ডার করুন
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderConfirmed;