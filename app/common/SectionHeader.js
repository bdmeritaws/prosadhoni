"use client";

import Link from "next/link";

export default function SectionHeader({ title, href = "#" }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <Link
        href={href}
        className="text-sm text-[#FC8934] hover:underline font-medium"
      >
        View All
      </Link>
    </div>
  );
}
