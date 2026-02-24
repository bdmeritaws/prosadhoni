import React from 'react';
import {Star} from 'react-bootstrap-icons';

function ProductRating({ratingCount}) {
    return (
        <>
            <div className="flex flex-row items-center justify-between px-2 md:py-0 py-3">
                <div className="flex">
                    <div className="flex gap-1 text-sm">
                        <span><Star size={17} className="text-yellow-400"/></span>
                        <span><Star size={17} className="text-yellow-400"/></span>
                        <span><Star size={17} className="text-yellow-400"/></span>
                        <span><Star size={17} className="text-yellow-400"/></span>
                        <span><Star size={17} className="text-gray-300"/></span>
                    </div>
                    <div className="text-xs text-gray-500 ml-3 mt-0.5"> {ratingCount} Ratings</div>
                </div>
            </div>
        </>
    );
}

export default ProductRating;