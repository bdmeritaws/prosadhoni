"use client";

import Image from "next/image";
import Link from "next/link";

export default function BrandCard({ brand }) {
  return (
    <Link
      href={`/brand/${brand.slug}`}
      className="border rounded-lg p-3 flex flex-col items-center justify-center bg-white hover:shadow-md transition"
    >
      <div className="relative w-24 h-16">
        <Image
          src={brand.image}
          alt={brand.name}
          fill
          className="object-contain"
        />
      </div>

      <p className="mt-2 text-xs font-medium text-gray-700">
        {brand.name}
      </p>
    </Link>
  );
}
