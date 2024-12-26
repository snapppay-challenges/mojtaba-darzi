import React, { ReactNode, useState, useEffect } from "react";

type ErrorBoundaryProps = {
    children: ReactNode;
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const handleError = (event: ErrorEvent) => {
            setHasError(true);
            setError(event.error);
        };
        window.addEventListener("error", handleError);
        return () => {
            window.removeEventListener("error", handleError);
        };
    }, []);

    if (hasError) {
        return <div className="w-full h-[320px] flex justify-center items-center">
            <h1 className="text-2xl text-red-400">Something went wrong: <span className="text-xl font-bold">{error?.message || "Try again later!!"}</span></h1>
        </div>
    }
    return <>{children}</>;
};

export default ErrorBoundary;
