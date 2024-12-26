import React, { memo, useCallback, useEffect, useState } from "react";
import { SlArrowUp } from "react-icons/sl";

const BackToTop = memo(() => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = useCallback(() => {
        setIsVisible(window.scrollY > 300);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const toTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <button
            className={`w-14 h-14 fixed bottom-[20px] right-[20px] bg-gray-700 shadow-lg 
            hover:shadow-2xl rounded-full flex justify-center items-center transition group hover:bg-black
            ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
                }`}
            onClick={toTop}
        >
            <SlArrowUp size={20} className="text-white group-hover:scale-125 transition" />
        </button>
    );
});

export default BackToTop;