import { memo } from "react";
import { PiBuildingOfficeLight, PiTelegramLogoThin } from "react-icons/pi";
import { NOT_AVAILABLE } from "../../contstant";
import { CiLocationOn, CiMail, CiPhone, CiTextAlignLeft } from "react-icons/ci";
import InfoText from "./info-text";

type InfoSectionProps = {
    phone: string | null;
    email: string | null;
    telegram: string | null;
    company: string | null;
    address: string | null;
    note: string | null;
    loading: boolean;
}

const InfoSection = memo(({ phone, email, telegram, company, address, note, loading }: InfoSectionProps) => (
    <div className="flex flex-col gap-4 md:flex-1">
        <div className="flex flex-wrap gap-2 p-3 shadow-inner rounded-xl">
            <InfoText loading={loading} icon={<CiPhone size={24} color="gray" />} label={phone || NOT_AVAILABLE} />
            <InfoText loading={loading} icon={<CiMail size={24} color="gray" />} label={email || NOT_AVAILABLE} />
            <InfoText loading={loading} icon={<PiTelegramLogoThin size={24} color="gray" />} label={telegram || NOT_AVAILABLE} />
            <InfoText loading={loading} icon={<PiBuildingOfficeLight size={24} color="gray" />} label={company || NOT_AVAILABLE} />
            <>
                <CiLocationOn size={24} color="gray" className="float-left" />
                {loading
                    ? <div className="inline-block mt-1 animate-pulse bg-gray-200 w-36 h-3 sm:h-4 rounded-full" />
                    : <span className="text-base sm:text-lg text-gray-900 font-regular">{address || NOT_AVAILABLE}</span>
                }
            </>
        </div>
        <div className="flex flex-wrap flex-col">
            <div className="p-2 rounded-lg bg-gray-100 mt-4 border-2 border-gray-200">
                <CiTextAlignLeft size={24} color="gray" className="float-left" />
                {loading
                    ? <div className="inline-block ml-2 mt-1 animate-pulse bg-white w-64 h-3 sm:h-4 rounded-full" />
                    : <span className="ml-2 text-base sm:text-lg text-gray-900 font-regular">{note || NOT_AVAILABLE}</span>}
            </div>
        </div>
    </div>
));


export default InfoSection;
