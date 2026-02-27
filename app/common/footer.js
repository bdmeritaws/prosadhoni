import React from "react";
import Image from "next/image";
import { Facebook, Instagram, Youtube } from "react-bootstrap-icons";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#2b2f33] to-[#1f2327] text-gray-300 py-12 px-6 md:px-16 mt-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/images/logo/logo-prosadhoni.webp"
              alt="Prosadhoni Logo"
              width={40}
              height={40}
            />
            <h2 className="text-white text-xl font-semibold">
              Prosadhoni
            </h2>
          </div>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <span className="text-green-400">📞</span> 01727123480
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-400">✉</span> Support@prosadhoni.com
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4 border-b border-gray-600 inline-block pb-1">
            For Customer
          </h3>
          <ul className="space-y-2 text-sm mt-3">
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4 border-b border-gray-600 inline-block pb-1">
            Company
          </h3>
          <ul className="space-y-2 text-sm mt-3">
            <li><a href="#" className="hover:text-white transition">Refund & Returns</a></li>
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h3 className="text-white font-semibold mb-4 border-b border-gray-600 inline-block pb-1">
            Download App
          </h3>

          <div className="space-y-3 mt-3">

            {/* Google Play Button */}
            <a
              href="#"
              className="flex items-center gap-3 bg-black hover:bg-gray-900 transition px-4 py-3 rounded-lg border border-gray-600 w-[220px]"
            >
              {/* Google Play SVG */}
              <svg width="24" height="24" viewBox="0 0 512 512">
                <path fill="#34A853" d="M325.3 234.3L104.6 13.6C98.5 7.5 88 11.8 88 20.5v471c0 8.7 10.5 13 16.6 6.9l220.7-220.7z"/>
                <path fill="#FBBC05" d="M406.6 276.6l-56.3-32.5-63.7 63.7 63.7 63.7 56.3-32.5c24.3-14 24.3-48.4 0-62.4z"/>
                <path fill="#EA4335" d="M350.3 371.5L286.6 307.8 104.6 489.8c6.1 6.1 16.6 1.8 16.6-6.9V20.5c0-8.7-10.5-13-16.6-6.9l182 182 63.7-63.7z"/>
                <path fill="#4285F4" d="M406.6 235.4l-56.3-32.5-63.7-63.7-63.7 63.7 63.7 63.7 63.7-63.7 56.3 32.5c24.3 14 24.3 48.4 0 62.4z"/>
              </svg>

              <div className="text-left leading-tight">
                <p className="text-xs">Get it on</p>
                <p className="text-sm font-semibold text-white">Google Play</p>
              </div>
            </a>

            {/* App Store Button */}
            <a
              href="#"
              className="flex items-center gap-3 bg-black hover:bg-gray-900 transition px-4 py-3 rounded-lg border border-gray-600 w-[220px]"
            >
              {/* Apple SVG */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M16.365 1.43c0 1.14-.466 2.18-1.223 2.94-.8.8-2.06 1.42-3.18 1.34-.14-1.08.4-2.18 1.17-2.95.85-.86 2.2-1.48 3.23-1.33zM20.9 17.6c-.5 1.1-.74 1.6-1.4 2.6-.9 1.4-2.17 3.15-3.73 3.17-1.38.02-1.74-.9-3.62-.89-1.88.01-2.28.91-3.66.89-1.56-.02-2.76-1.6-3.66-3-.94-1.47-1.66-3.56-1.68-5.5-.01-1.12.23-2.2.74-3.08.72-1.26 2-2.05 3.4-2.07 1.33-.03 2.58.91 3.62.91 1.02 0 2.94-1.12 4.96-.95.84.03 3.2.34 4.72 2.6-.12.07-2.82 1.65-2.79 4.91.03 3.9 3.4 5.2 3.43 5.22z"/>
              </svg>

              <div className="text-left leading-tight">
                <p className="text-xs">Download on the</p>
                <p className="text-sm font-semibold text-white">App Store</p>
              </div>
            </a>

          </div>

          {/* Social Icons */}
          <div className="flex gap-3 mt-5">
            <a className="border border-gray-600 p-2 rounded-md hover:bg-gray-700 transition">
              <Facebook size={16} />
            </a>
            <a className="border border-gray-600 p-2 rounded-md hover:bg-gray-700 transition">
              <Youtube size={16} />
            </a>
            <a className="border border-gray-600 p-2 rounded-md hover:bg-gray-700 transition">
              <Instagram size={16} />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
