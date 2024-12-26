import React, { memo } from "react";
import { Link } from "react-router-dom";
import { CiPhone } from "react-icons/ci";
import { truncate } from "../../utils";
import { NOT_AVAILABLE } from "../../contstant";
import { FaRobot } from "react-icons/fa";
import { ContactType } from "../../types";
type ContactCardProps = {
    contact: ContactType;
}

const ContactFrequentlyCard = memo(({ contact: { avatar, id, first_name, last_name, phone } }: ContactCardProps) => {
    return (
        <Link
            to={`/contact/${id}`}
            className="max-w-[240px] min-w-max border border-gray-200 rounded-full group
                p-2 pr-6 hover:bg-gray-200 flex transition gap-2 justify-start items-center"
        >
            <div className="border border-gray-200 rounded-full overflow-hidden w-8 h-8 flex justify-center 
                items-center bg-gray-200 group-hover:bg-white">
                {avatar ? <img
                    src={avatar}
                    alt={first_name || "name"}
                    className="w-full h-full"
                    loading="eager"
                /> : <FaRobot className="text-gray-400 w-6 h-6 p-1" />}
            </div>
            <div className="flex flex-col justify-center">
                <h3 className="text-xs sm:text-sm font-normal">{truncate(`${first_name} ${last_name}`, 20)}</h3>
                <div className="flex gap-1 justify-start items-center mt-1">
                    <CiPhone className="w-3 h-3 sm:w-4 sm:h-4" color="gray" />
                    <p className="text-xs text-gray-800 font-thin">{phone || NOT_AVAILABLE}</p>
                </div>
            </div>
        </Link>
    );
});

export default ContactFrequentlyCard;
