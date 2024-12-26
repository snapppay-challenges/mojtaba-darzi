import { useNavigate } from "react-router-dom";
import React, { useCallback } from "react";

const NoFound: React.FC = () => {
    const navigate = useNavigate();

    const goHome = useCallback(() => {
        navigate("/");
    }, []);

    return (
        <div className="w-full flex flex-col justify-center items-center h-[320px] text-center">
            <div className="flex items-center">
                <p className="text-4xl text-center font-medium text-black mr-5 pr-5 border-r-2 py-2 border-gray-200">
                    404
                </p>
                <span className="text-base font-regular">Not Found</span>
            </div>
            <button
                className="py-2 px-6 mt-4 text-white text-lg font-thin rounded-full bg-blue-500 hover:bg-blue-600 shadow-md transition"
                onClick={goHome}
            >
                Back to Home
            </button>
        </div>
    );
};

export default NoFound;
