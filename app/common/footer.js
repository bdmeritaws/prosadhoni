import React from 'react';
import {Facebook, Youtube, Tiktok, Instagram} from 'react-bootstrap-icons';

function Footer(props) {
    return (
        <footer className="bg-[#0f1a2c] text-white py-8 px-4 md:px-16 mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container">
                {/* Company Section */}
                <div>
                    <h3 className="text-orange-500 font-semibold mb-2">Company</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">রিটার্ন পলিসি</a></li>
                        <li><a href="#">রিফান্ড পলিসি</a></li>
                    </ul>
                </div>

                {/* Quick Help Section */}
                <div>
                    <h3 className="text-orange-500 font-semibold mb-2">Quick Help</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="#">গ্রাহক সেবা</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>

                {/* Social Media Section */}
                <div>
                    <h3 className="text-orange-500 font-semibold mb-2">Social Media</h3>
                    <div className="flex space-x-3 mt-2">
                        <a href="#">
                            <div className="h-10 w-10 bg-[#3A5A99] rounded-md flex items-center justify-center">
                                <Facebook className="w-4 h-4 text-white"/>
                            </div>
                        </a>
                        <a href="#">
                            <div className="h-10 w-10 bg-red-500 rounded-md flex items-center justify-center">
                                <Youtube className="w-5 h-5 text-white"/>
                            </div>
                        </a>
                        <a href="#">
                            <div className="h-10 w-10 p-2 bg-black rounded-md flex items-center justify-center">
                                <Tiktok className="w-5 h-5 text-white"/>
                            </div>
                        </a>
                        <a href="#">
                            <div
                                className="h-10 w-10 p-2 bg-black rounded-md flex items-center justify-center bg-gradient-to-br from-[#f58529] via-[#dd2a7b] via-40% to-[#515bd4]">
                                <Instagram className="w-5 h-5 text-white"/>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-6 border-t border-gray-600"></div>
        </footer>
    );
}

export default Footer;