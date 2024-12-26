import React, { memo } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

interface NoResultProps {
    message?: string;
    subtext?: string;
}

const NoResult = memo(({ message = "No results found", subtext = "Try another search" }: NoResultProps) => {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-1 py-8 text-gray-600" data-testid="no_result">
            <HiMiniMagnifyingGlass size={48} className="text-gray-400" />
            <p className="text-lg font-medium mt-4">{message}</p>
            <span className="text-sm font-thin">{subtext}</span>
        </div>
    );
});

export default NoResult;
