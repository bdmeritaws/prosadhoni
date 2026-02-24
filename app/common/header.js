import React from 'react';
import {Phone, Whatsapp, Envelope, Person, PersonDown} from 'react-bootstrap-icons';
import ModalSideBar from "@/app/common/modalSideBar";

function Header(props) {
    return (
        <div>
            <div className="bg-gray-100 display">
                <div className="flex flex-row justify-between pb-2 pt-1 px-10 py-10">
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-row gap-1">
                            <Phone size={20} className="text-green-600 cursor-pointer text-md mt-1"/>
                            <div>+88001727123480</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Whatsapp size={20} className="text-green-600 cursor-pointer text-md mt-1"/>
                            <div>+88001727123480</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Envelope size={20} className="text-green-600 cursor-pointer text-md mt-1"/>
                            <div>support@proshadhoni.com</div>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2">
                        <div className="flex flex-row gap-1">
                            <Person size={22} className="text-green-600 cursor-pointer text-md mt-1"/>
                            <div>Become a Merchant</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <PersonDown size={22} className="text-green-600 cursor-pointer text-md mt-1"/>
                            <div>Sign Up</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;