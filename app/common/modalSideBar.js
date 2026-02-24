"use client"
import React, {useEffect, useState} from 'react';
import {Trash} from "react-bootstrap-icons";
import CartButton from "@/app/product/cartButton";
import {addToCart, deleteSingleProduct, modalCheck, modalCheckOrder} from "@/app/redux/product/productSlice";
import {useDispatch, useSelector} from "react-redux";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const AppURL = process.env.API_BASE_URL;

function ModalSideBar(props) {
    const productId = "";
    const dispatch = useDispatch();
    const cartProduct = useSelector((state) => state.products.productCart);
    const checkModal = useSelector((state) => state.products.sideBarModal);
    const [productDetails, setProductDetails] = useState([]);
    const [isLoding, setIsLoding] = useState(false);
    const [product, setProduct] = useState([]);
    const [images, setImages] = useState([]);

    const handelModal = () => {
        dispatch(modalCheck(false));
    }

    const deleteProduct = (product_slag) => {
        if (cartProduct?.length == 1) {
            dispatch(modalCheck(false));
        }
        dispatch(deleteSingleProduct(product_slag));
    }

    const handelClickOrder = () => {
        dispatch(modalCheckOrder(true));
        dispatch(modalCheck(false));
    }

    let total_side_bar = 0;

    useEffect(() => {
        setIsLoding(true);
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
                    setIsLoding(false);
                }
            })
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className={`fixed inset-0 z-50 ${checkModal ? '' : 'pointer-events-none'}`}>
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                    checkModal ? 'bg-opacity-50' : 'bg-opacity-0'}`} onClick={handelModal}/>
            <div
                className={`absolute top-0 right-0 h-full md:w-96 w-[310px] bg-white shadow-xl transform transition-transform duration-300 ${
                    checkModal ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="my-4 text-center">Shopping Cart</div>
                <button
                    onClick={handelModal}
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl">
                    &times;
                </button>

                <div className="border border-b border-gray-300"></div>
                <div className="w-full max-w-sm h-full bg-white p-4 flex flex-col overflow-y-auto">
                    <div className="space-y-4 flex-1">
                        {cartProduct?.map((v_p, index) => {
                            total_side_bar += v_p?.qty * v_p?.price;
                            return (
                                <div className="flex gap-3 border border-gray-300 rounded-md items-center" key={index}>
                                    <img src={v_p?.product_image} alt="Product"
                                         className="w-14 h-14 ml-1 object-cover rounded border"/>
                                    <div className="flex-1">
                                        <p className="text-[14px]">{v_p?.product_name}</p>
                                        <div className="flex flex-row mt-1">

                                            <div onClick={() => deleteProduct(v_p?.product_slag)}
                                                 className="cursor-pointer">
                                                <Trash size={20} color="red"/>

                                                <p className="text-sm text-gray-500">৳ {v_p?.price}</p>
                                            </div>

                                            <CartButton productId={v_p.product_slag} cartProduct={cartProduct}
                                                        type={1}/>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/*<div className="flex justify-between border-t pt-3 mt-4 text-sm text-gray-600">*/}
                    {/*    <button className="flex items-center gap-1">*/}
                    {/*        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
                    {/*            <path d="M12 20h9" stroke-width="2" stroke-linecap="round"*/}
                    {/*                  stroke-linejoin="round"/>*/}
                    {/*            <path d="M12 4h9" stroke-width="2" stroke-linecap="round"*/}
                    {/*                  stroke-linejoin="round"/>*/}
                    {/*        </svg>*/}
                    {/*        Note*/}
                    {/*    </button>*/}
                    {/*    <button className="flex items-center gap-1">*/}
                    {/*        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
                    {/*            <path d="M9 14l6-6m0 0L9 2m6 6H3" stroke-width="2" stroke-linecap="round"*/}
                    {/*                  stroke-linejoin="round"/>*/}
                    {/*        </svg>*/}
                    {/*        Coupon*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                    <div className="flex justify-between font-semibold text-lg py-2">
                        <span>Subtotal</span>
                        <span>৳{total_side_bar}</span>
                    </div>
                    <button onClick={handelClickOrder}
                            type="submit"
                            className="bg-orange-500 text-white rounded-sm border-0 mb-12 shadow-md text-[14px] font-medium md:px-6 px-2 py-3 animate-shake-loop">
                        🛒 ক্যাশ অন ডেলিভারিতে অর্ডার করুন
                    </button>

                </div>
            </div>
        </div>
    );
}

export default ModalSideBar;