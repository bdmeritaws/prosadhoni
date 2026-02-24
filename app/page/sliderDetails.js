"use client"
import React, {useEffect, useState} from 'react';
import {ChevronLeft, ChevronRight} from 'react-bootstrap-icons';
import {useSelector} from "react-redux";

function SliderDetails(props) {
    const {images, type} = props
    const [currentIndex, setCurrentIndex] = useState(0);
    const category_slag = useSelector((state) => state?.products?.categorySlag);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images?.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change slides every 5 seconds

        return () => clearInterval(interval);
    }, [currentIndex, images?.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images?.length - 1 ? 0 : prevIndex + 1
        );
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images?.length - 1 ? 0 : prevIndex - 1
        );
    }

    const thisSlider = (val) => {
        setCurrentIndex(val);
    }

    return (
        <div>
            {category_slag > 0 ? "" :
                <div className="container">
                    <div
                        className={type === 1 ? "w-full h-64 slider overflow-hidden rounded-md mt-4" : "w-full h-auto slider overflow-hidden rounded-md mt-4"}>
                        {type === 1 ?
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{
                                    transform: `translateX(-${currentIndex * 100}%)`,
                                    height: '100%',
                                    width: '100%'
                                }}>
                                {images?.map((image, index) => (
                                    <img key={index} src={image.image} alt={`Slide ${index + 1}`}/>
                                ))}
                            </div> :
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{transform: `translateX(-${currentIndex * 100}%)`}}>
                                {images?.map((image, index) => (
                                    <img key={index} src={image.image} alt={`Slide ${index + 1}`}/>
                                ))}
                            </div>
                        }
                        <button className="slider-btn-right slider-btn-prev" onClick={prevSlide}>
                            <ChevronLeft size={30} color="black"/>
                        </button>
                        <button className="slider-btn-left slider-btn-next" onClick={nextSlide}>
                            <ChevronRight size={30} color="black"/>
                        </button>
                    </div>

                    <div className="flex justify-center items-center gap-x-1.5 mt-3">
                        {images?.map((v_image, index) => (
                            <span key={index} onClick={() => thisSlider(index)}
                                  className=
                                      {currentIndex === index ?
                                          "h-3.5 w-3.5 bg-red-500  text-center rounded-full cursor-pointer" :
                                          "h-3.5 w-3.5 bg-pink-100 text-center rounded-full cursor-pointer"
                                      }>
                        </span>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}

export default SliderDetails;