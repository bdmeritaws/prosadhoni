"use client"
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addToCart, deleteSingleProduct, modalCheck, modalCheckOrder} from "@/app/redux/product/productSlice";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import AddToCart from "@/app/common/addToCart";
import {Trash} from "react-bootstrap-icons";
import CartButton from "@/app/product/cartButton";
import {useRouter} from "next/navigation";

const AppURL = process.env.API_BASE_URL;

function ModalOrderConfirmed(props) {
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
                            localStorage.removeItem("product");
                            setTimeout(() => {
                                router.push(`/order/${res?.order_number}`);
                            }, 2000);
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
                <div className="fixed inset-0 top-5 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div
                        className="bg-white md:w-full w-[92%] max-w-md rounded-lg shadow-lg p-5 relative animate-fade-in max-h-[100vh] overflow-y-auto">
                        <button
                            onClick={handelClick}
                            className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-2xl">
                            &times;
                        </button>

                        <div className="space-y-2">

                            <h2 className="text-center text-[18px] font-bold text-gray-800">
                                ক্যাশ অন ডেলিভারিতে
                            </h2>
                            <h2 className="text-center text-[18px] font-bold text-gray-800">
                                অর্ডার করতে আপনার তথ্য দিন
                            </h2>

                            <div className="space-y-3">
                                <input onChange={(e) => setCustomerName(e.target.value)}
                                       type="text"
                                       placeholder="আপনার নাম"
                                       className="w-full border text-[16px] rounded px-3 py-2.5 outline-none"/>
                                <input
                                    type="tel"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder="আপনার মোবাইল নাম্বার"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    className="w-full border text-[16px] rounded px-3 py-2.5 outline-none"
                                />

                                <input onChange={(e) => setAddress(e.target.value)}
                                       type="text"
                                       placeholder="আপনার সম্পূর্ণ ঠিকানা যেমন গ্রাম, থানা, জেলা"
                                       className="w-full border text-[16px] rounded px-3 py-2.5 outline-none"/>
                            </div>

                            <div>
                                <div className="text-[16px] text-black font-bold mb-1">শিপিং এরিয়া</div>
                                <label className="flex justify-between border rounded p-3 cursor-pointer mb-2">
                                    <div className="flex items-center gap-2" onClick={() => handelDeliveryCharge(60)}>
                                        <input type="radio" name="shipping" defaultChecked/>
                                        <span>ঢাকা সিটির ভিতরে</span>
                                    </div>
                                    <span className="font-semibold">TK 60.00</span>
                                </label>
                                <label className="flex justify-between border rounded p-3 cursor-pointer bg-gray-100">
                                    <div className="flex items-center gap-2" onClick={() => handelDeliveryCharge(120)}>
                                        <input type="radio" name="shipping"/>
                                        <span>ঢাকা সিটির বাইরে</span>
                                    </div>
                                    <span className="font-semibold">TK 120.00</span>
                                </label>
                            </div>

                            <div className="h-auto overflow-y-auto">
                                <table className="min-w-full border border-gray-200 text-sm">
                                    <thead className="bg-gray-100 text-left">
                                    <tr>
                                        <th className="p-3 border">Image</th>
                                        <th className="p-3 border">Product Name</th>
                                        <th className="p-3 border">Qty</th>
                                        <th className="p-3 border">Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cartProduct.map((v_po, index) => {
                                        total += v_po?.qty * v_po?.price;
                                        return (
                                            <tr key={index} className="border-t">
                                                <td className="md:p-3 p-1 border">
                                                    <img
                                                        src={v_po?.product_image}
                                                        alt="Product"
                                                        className="md:w-12 md:h-12 h-10 w-10 mx-auto object-cover rounded border"
                                                    />
                                                </td>
                                                <td className="md:p-3 border">
                                                    <div>{v_po?.product_name.substring(0, 10)}..</div>
                                                    <div className="flex flex-row mt-1">
                                                        <div onClick={() => deleteProduct(v_po?.product_slag)}
                                                             className="cursor-pointer">
                                                            <Trash size={20} color="red" className="mt-5"/>
                                                        </div>
                                                        <CartButton productId={v_po.product_slag}
                                                                    cartProduct={cartProduct}
                                                                    type={1}/>
                                                    </div>
                                                </td>
                                                <td className="md:p-3 border text-center">{v_po?.qty}</td>
                                                <td className="md:p-3 border text-center">৳ {v_po?.qty * v_po?.price}</td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="bg-gray-100 p-4 rounded space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span>সাব টোটাল</span>
                                    <span>TK {total}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>ডেলিভারি চার্জ</span>
                                    <span>TK {deliveryCharge}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg border-t pt-2">
                                    <span>সর্বমোট</span>
                                    <span>TK {parseInt(total) + parseInt(deliveryCharge)}</span>
                                </div>
                            </div>


                            {specialProduct?.product_name !== undefined ?
                                <div
                                    className="flex items-start p-3 rounded-lg border border-blue-300 bg-blue-50 max-w-md">
                                    <AddToCart productDetails={specialProduct} buttonText="checkbox"/>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">
                                            Add <span
                                            className="font-bold text-black">{specialProduct?.product_name}</span> for
                                            just <span
                                            className="font-bold text-black">Tk {specialProduct?.sales_price}</span>
                                        </p>
                                        <p className="text-xs text-gray-600">একই ডেলিভারি চার্জে পেয়ে যাচ্ছেন</p>
                                    </div>
                                    <img src={specialProduct?.product_image} alt="honey"
                                         className="w-12 h-12 rounded ml-3 object-cover"/>
                                </div> : ""}

                            <div className="text-center space-y-2">
                                <button onClick={orderPlace}
                                        type="submit"
                                        className="bg-orange-500 text-white rounded-sm border-0 shadow-md text-[14px] font-medium md:px-6 px-2 py-3 animate-shake-loop">
                                    আপনার অর্ডার কনফার্ম করতে ক্লিক করুন
                                </button>
                                <p className="text-green-600 text-sm">
                                    উপরের বাটনে ক্লিক করলে আপনার অর্ডারটি সাথে সাথে কনফার্ম হয়ে যাবে
                                </p>
                            </div>
                            <div className="text-center text-red-600">
                                {successMsg}
                            </div>

                            <div className="text-center text-red-600">
                                {errorMsg}
                            </div>
                        </div>
                    </div>
                </div> : ""
            }
        </div>
    );
}

export default ModalOrderConfirmed;