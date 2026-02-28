"use client";

import Image from "next/image";

const features = [
  {
    id: 1,
    mainText: "100%",
    subText: "Authentic",
    image: "https://babshahi.s3.ap-south-1.amazonaws.com/category/100%-authentic.webp",
    bgColor: "bg-purple-100",
    ringColor: "ring-purple-200",
  },
  {
    id: 2,
    mainText: "Beauty",
    subText: "Consultation",
    image: "https://babshahi.s3.ap-south-1.amazonaws.com/category/beauty-consultation.webp",
    bgColor: "bg-pink-100",
    ringColor: "ring-pink-200",
  },
  {
    id: 3,
    mainText: "Free",
    subText: "Shipping",
    image: "https://babshahi.s3.ap-south-1.amazonaws.com/category/free-shipping.webp",
    bgColor: "bg-green-100",
    ringColor: "ring-green-200",
  },
  {
    id: 4,
    mainText: "Easy",
    subText: "Returns",
    image: "https://babshahi.s3.ap-south-1.amazonaws.com/category/easy-returns.webp",
    bgColor: "bg-yellow-100",
    ringColor: "ring-yellow-200",
  },
];

export default function Features() {
  return (
    <div className="container mx-auto mt-10 px-2">
      <div className="flex justify-center items-start gap-3 sm:gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2"
          >
            {/* Circle */}
            <div
              className={`
                w-14 h-14 
                sm:w-20 sm:h-20 
                lg:w-28 lg:h-28 
                flex items-center justify-center 
                rounded-full 
                ${feature.bgColor} 
                ring-2 sm:ring-4 ${feature.ringColor}
                mb-2
                transition-all duration-500
                group-hover:scale-110
                group-hover:shadow-xl
              `}
            >
              <Image
                src={feature.image}
                alt={`${feature.mainText} ${feature.subText}`}
                width={30}
                height={30}
                className="object-contain 
                           sm:w-12 sm:h-12 
                           lg:w-16 lg:h-16 
                           transition-transform duration-500 
                           group-hover:rotate-6"
              />
            </div>

            {/* Text */}
            <span className="text-xs sm:text-base lg:text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-pink-600">
              {feature.mainText}
            </span>
            <span className="text-[10px] sm:text-sm text-gray-700 leading-tight">
              {feature.subText}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}