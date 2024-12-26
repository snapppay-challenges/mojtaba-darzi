import React, { memo } from "react";

type LoadMoreProps = { onClick: () => void, loading: boolean }

const LoadMoreButton = memo(({ onClick, loading }: LoadMoreProps) => (
    <button
        onClick={onClick}
        className="border border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-full mt-4 mx-auto 
            block hover:bg-blue-500 hover:text-white disabled:border-gray-300 disabled:bg-white 
            disabled:text-gray-300 disabled:cursor-not-allowed"
        disabled={loading}
    >
        Load More
    </button>
));

export default LoadMoreButton;
