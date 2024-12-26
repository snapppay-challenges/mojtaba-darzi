const LoadingElement = ({ testId }: { testId?: string }) => {
    return (
        <div
            className="group w-full h-54 flex sm:items-center sm:flex-col p-4 
                transition gap-4 hover:box-shadow bg-gray-100 rounded-2xl hover:bg-white transition"
            data-testid={testId}
        >
            <div className="rounded-full sm:mb-2 md:mb-0 overflow-hidden group-hover:bg-gray-100">
                <div className="animate-pulse bg-white w-20 h-20 sm:w-28 sm:h-28 md:h-32 md:w-32 rounded-full" />
            </div>
            <div className="flex flex-col justify-center items-start sm:items-center">
                <div className="animate-pulse bg-white w-36 h-5 rounded-full" />
                <div className="animate-pulse bg-white w-32 h-4 rounded-full mt-2" />
            </div>
        </div>
    );
};

const ContactLoadingBox = () => {
    return (
        <>
            <LoadingElement testId="loading_box" />
            <LoadingElement />
            <LoadingElement />
            <LoadingElement />
            <LoadingElement />
            <LoadingElement />
            <LoadingElement />
            <LoadingElement />
            <LoadingElement />
            <LoadingElement />
        </>
    );
};

export default ContactLoadingBox;
