import React from 'react';

function Loader(props) {
    return (
        <div className="grid lg:grid-cols-5 grid-cols-2 gap-6">
            {[...Array(10)].map((_, index) => (
                <div key={index} className="border h-96 border-blue-300 shadow rounded-md p-4 animate-pulse">
                    <div className="h-36 bg-slate-200 rounded">
                        <img src="https://www.svgrepo.com/show/99075/picture.svg" className="h-28 w-28 mx-auto pt-5"/>
                    </div>
                    <div className="animate-pulse flex space-x-4 mt-5">
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-14 bg-slate-200 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                                    <div className="h-4 bg-slate-200 rounded col-span-1"></div>
                                </div>
                                <div className="h-4 bg-slate-200 rounded"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                                    <div className="h-4 bg-slate-200 rounded col-span-1"></div>
                                </div>
                                <div className="h-4 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Loader;