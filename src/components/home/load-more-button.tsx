import React, { memo } from "react";

type LoadMoreProps = { onClick: () => void, loading: boolean }

const LoadMoreButton = memo(({ onClick, loading }: LoadMoreProps) => (
    <button
        onClick={onClick}
        className="border border-2 border-transparent hover:border-gray-900 bg-gray-900 hover:bg-white 
            text-white hover:text-gray-900  px-4 py-2 rounded-full mt-4 mx-auto block disabled:border-gray-300 
            disabled:bg-white disabled:text-gray-300 disabled:cursor-not-allowed"
        disabled={loading}
    >
        Load More
    </button>
));

export default LoadMoreButton;
