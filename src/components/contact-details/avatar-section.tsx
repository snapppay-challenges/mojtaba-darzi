import { memo } from "react";
import { PiGenderIntersexThin } from "react-icons/pi";
import { NOT_AVAILABLE } from "../../contstant";
import { CiCalendar, CiCalendarDate } from "react-icons/ci";
import AvatarText from "./avatar-text";
import { FaRobot } from "react-icons/fa";

type AvatarSectionProps = {
    avatar: string | null;
    first_name: string | null;
    last_name: string | null;
    gender: string | null;
    createdAt: number | null;
    updatedAt: number | null;
    loading: boolean;
}

const AvatarSection = memo(({ avatar, first_name, last_name, gender, createdAt, updatedAt, loading }: AvatarSectionProps) => (
    <div className="flex flex-col gap-4 items-center">
        <div className="rounded-full border-2 md:border-2 border-gray-200 w-[160px] h-[160px] overflow-hidden md:w-[240px] md:h-[240px]">
            {loading
                ? <div className="animate-pulse bg-gray-200 rounded-full w-full h-full" />
                : avatar ? <img src={avatar} alt={first_name || ""} className="w-full h-full" loading="eager" /> : <FaRobot className="text-gray-300 w-full h-full p-8" />}
        </div>
        <div className="flex flex-col items-center">
            {loading
                ? <div className="animate-pulse bg-gray-200 w-36 sm:w-48 sm:h-4 h-5 rounded-full" />
                : <h2 className="text-2xl sm:text-3xl text-center font-bold mb-1">{`${first_name} ${last_name}`}</h2>
            }
            <div className="w-full flex justify-center gap-2 py-2 md:p-0 md:py-2 md:justify-start">
                <AvatarText icon={<PiGenderIntersexThin size={24} color="gray" />}
                    loading={loading}
                    label={gender || NOT_AVAILABLE} />
                <AvatarText
                    icon={<CiCalendar size={24} color="gray" />}
                    loading={loading}
                    label={createdAt ? new Date(createdAt).toLocaleDateString() : NOT_AVAILABLE}
                />
                <AvatarText
                    icon={<CiCalendarDate size={24} color="gray" />}
                    loading={loading}
                    label={updatedAt ? new Date(updatedAt).toLocaleDateString() : NOT_AVAILABLE}
                />
            </div>
        </div>
    </div>
));
export default AvatarSection;
