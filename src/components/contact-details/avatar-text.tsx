import { memo } from "react";

type AvatarTextProps = {
    icon: React.ReactNode;
    label: string;
    loading: boolean;
}

const AvatarText = memo(({ icon, label, loading }: AvatarTextProps) => (
    <div className="flex gap-1 items-center">
        {icon}
        {loading
            ? <div className="animate-pulse bg-gray-200 w-16 sm:w-24 h-3 sm:h-4 rounded-full" />
            : <span className="text-sm sm:text-lg text-gray-900 font-thin">{label}</span>}
    </div>
));

export default AvatarText;
