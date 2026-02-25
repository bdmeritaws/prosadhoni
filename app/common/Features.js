"use client";

import Image from "next/image";

const features = [
  {
    id: 1,
    mainText: "100%",
    subText: "Authentic",
    image: "/images/100-Authentic.webp",
    bgColor: "bg-purple-100",
    ringColor: "ring-purple-200",
  },
  {
    id: 2,
    mainText: "Beauty",
    subText: "Consultation",
    image: "/images/beauty-consultation.webp",
    bgColor: "bg-pink-100",
    ringColor: "ring-pink-200",
  },
  {
    id: 3,
    mainText: "Free",
    subText: "Shipping",
    image: "/images/free-shipping.webp",
    bgColor: "bg-green-100",
    ringColor: "ring-green-200",
  },
  {
    id: 4,
    mainText: "Easy",
    subText: "Returns",
    image: "/images/easy-returns.webp",
    bgColor: "bg-yellow-100",
    ringColor: "ring-yellow-200",
  },
];

export default function Features() {
  return (
    <div className="container mx-auto mt-12">
      {/* Use flex instead of grid for closer spacing */}
      <div className="flex flex-wrap justify-center -mx-4">
        {features.map((feature) => (
          <div key={feature.id} className="flex flex-col items-center mx-4 mb-4">
            {/* Circular Icon with individual background and ring */}
            <div
              className={`w-20 h-20 flex items-center justify-center rounded-full ${feature.bgColor} ring-4 ${feature.ringColor} mb-1.5 transition-transform hover:scale-105`}
            >
              <Image
                src={feature.image}
                alt={`${feature.mainText} ${feature.subText}`}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>

            {/* Text below circle */}
            <div className="text-center">
              <span className="text-lg font-bold text-gray-900 block">
                {feature.mainText}
              </span>
              <span className="text-sm font-normal text-gray-700 block">
                {feature.subText}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
