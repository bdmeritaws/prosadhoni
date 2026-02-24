"use client"
import React, {useEffect, useState} from 'react';
import {Cart} from "react-bootstrap-icons";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, modalCheck, modalCheckOrder} from "@/app/redux/product/productSlice";

function AddToCart(props) {
    const {productDetails, buttonText} = props;
    const dispatch = useDispatch();
    const cartProduct = useSelector((state) => state.products.productCart);
    useEffect(() => {
        var checkProduct = cartProduct?.find(p => p.product_slag === productDetails?.id);
        if (checkProduct !== undefined) {
            setInitialQty(checkProduct.qty);
        }
    }, []);

    useEffect(() => {
        var checkProduct = cartProduct?.find(p => p.product_slag === productDetails?.id);
        if (checkProduct !== undefined) {
            setInitialQty(checkProduct.qty);
        }
    }, []);

    const [initialQty, setInitialQty] = useState(0);

    const clickToCart = () => {
        setInitialQty(1);
        const product = {
            product_id: productDetails?.id,
            product_slag: productDetails?.slag_name,
            product_name: productDetails?.product_name,
            product_image: productDetails?.product_image,
            price: productDetails?.sales_price,
            unit_price: productDetails?.unit_price,
            mrp_price: productDetails?.mrp_price,
            qty: 1
        }
        const id = productDetails?.id;
        const checkProduct = cartProduct?.find(p => p.product_id === id);
        if (checkProduct === undefined) {
            dispatch(addToCart(product));
        } else {
            // console.log(checkProduct); return array filtered object
        }
    }

    const handelClickSideBar = () => {
        clickToCart();
        if (buttonText == "কার্টে রাখুন") {
            dispatch(modalCheck(true));
        } else {
            if (buttonText === "checkbox") {
                dispatch(modalCheckOrder(true));
            } else {
                dispatch(modalCheckOrder(true));
            }
        }
    }

    return (
        <div>
            {buttonText === "checkbox" ?
                <div>
                    <input onClick={handelClickSideBar} type="checkbox" className="mt-1 mr-3 w-4 h-4 accent-blue-500"/>
                </div> :
                <div onClick={handelClickSideBar}
                     className={buttonText === "কার্টে রাখুন" ? "items-baseline mt-2 p-1 bg-green-600 rounded-md cursor-pointer" : "items-baseline mt-2 p-1 bg-amber-500 rounded-md cursor-pointer"}>
                    <div className="mx-auto w-36 rounded-md flex flex-row gap-x-2">
                        {buttonText === "কার্টে রাখুন" ?
                            <div><Cart className="mt-1" size={23} color="white"/></div> : ""}
                        <div className="text-white text-center pt-1">
                            {buttonText}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default AddToCart;