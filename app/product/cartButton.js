import React, {useEffect, useState} from 'react';
import {decrementToCart, incrementToCart} from "@/app/redux/product/productSlice";
import {useDispatch} from "react-redux";

function CartButton(props) {
    const {productId, cartProduct, type} = props;
    const dispatch = useDispatch();
    const [initialData, setInitialData] = useState(0);
    const checkProduct = cartProduct?.find(findProductByProductId => findProductByProductId.product_slag === productId);
    useEffect(() => {
        if (checkProduct !== undefined) {
            setInitialData(checkProduct.qty);
        }
    }, []);

    const clickedIncrementToCart = () => {
        const updatedState = initialData + 1;
        setInitialData(updatedState);
        dispatch(incrementToCart({productId, updatedState}));
    }

    const clickedDecrementToCart = () => {
        const updatedDecrementState = initialData - 1;
        setInitialData(updatedDecrementState);
        dispatch(decrementToCart({productId, updatedDecrementState}));
    }

    return (
        <div className={type === 1 ? "flex flex-row gap-x-1.5 w-24 mx-auto" : "flex flex-row gap-x-3"}>
            {initialData > 1 ?
                <div onClick={clickedDecrementToCart}
                     className="h-7 w-7 bg-red-500 rounded-md text-center text-white cursor-pointer pt-0.5">-
                </div> :
                <div
                    className="h-7 w-7 bg-red-300 rounded-md text-center text-white cursor-pointer pt-0.5">-
                </div>
            }
            <div className={type === 1 ?
                "w-10 border border-gray-300 outline-0 pt-0.5 h-7 rounded-md text-center" : "w-36 border border-gray-300 outline-0 h-7 rounded-md text-center"}>
                {initialData}
            </div>
            <div onClick={clickedIncrementToCart}
                 className="h-7 w-7 bg-green-500 rounded-md text-center text-white cursor-pointer pt-0.5">+
            </div>
        </div>
    );
}

export default CartButton;