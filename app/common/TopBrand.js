"use client";

import SectionHeader from "./SectionHeader";
import BrandCard from "./BrandCard";


const brands = [
  { id: 1, name: "NIVEA", image: "/brands/nivea.webp", slug: "nivea" },
  { id: 2, name: "SkinPure", image: "/brands/skinpure.webp", slug: "skinpure" },
  { id: 3, name: "Garnier Men", image: "/brands/garnier.webp", slug: "garnier-men" },
  { id: 4, name: "Vaseline", image: "/brands/vaseline.webp", slug: "vaseline" },
  { id: 5, name: "CeraVe", image: "/brands/cerave.webp", slug: "cerave" },
];

export default function TopBrand() {
  return (
    <div className="container mx-auto px-4 mt-10">
      <SectionHeader title="Top Brand" href="/brands" />

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {brands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </div>
  );
}
