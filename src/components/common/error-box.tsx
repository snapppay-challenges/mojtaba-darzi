import React, { memo } from "react";

const ErrorBox = memo(() => {
    return (
        <div className="w-full h-[320px] flex justify-center w-full flex flex-col justify-center items-center py-6 text-center" data-testid="error_box">
            <p className=" text-lg sm:text-xl font-semibold text-red-500 p-4">
                An error occurred. Please try again later.
            </p>
        </div>
    );
});

export default ErrorBox;
