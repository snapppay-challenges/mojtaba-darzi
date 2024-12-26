import { memo } from "react";

type InfoTextProps = {
    icon: React.ReactNode;
    label: string;
    loading: boolean
}

const InfoText = memo(({ icon, label, loading }: InfoTextProps) => (
    <div className="flex gap-2 items-center w-full pb-2 border-b border-gray-100">
        {icon}
        {loading
            ? <div className="animate-pulse bg-gray-200 w-36 h-3 sm:h-4 rounded-full" />
            : <span className="text-base sm:text-lg text-gray-900 font-regular">{label}</span>}
    </div>
));

export default InfoText;