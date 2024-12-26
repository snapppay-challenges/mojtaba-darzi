import React, { memo } from "react";
import { Link } from "react-router-dom";
import { ContactType } from "../../types/ContactType";
import { CiPhone } from "react-icons/ci";
import { truncate } from "../../utils";
import { NOT_AVAILABLE } from "../../contstant";
import { FaRobot } from "react-icons/fa";

type ContactCardProps = {
    contact: ContactType;
}

const ContactCard = memo(({ contact: { avatar, first_name, id, phone, last_name } }: ContactCardProps) => {
    return (
        <Link
            to={`/contact/${id}`}
            className="group w-full h-54 flex sm:items-center sm:flex-col p-4 
                transition gap-4 hover:box-shadow bg-gray-100 rounded-2xl hover:bg-white transition"
        >
            <div className="rounded-full sm:mb-2 md:mb-0 overflow-hidden group-hover:bg-gray-100">
                {avatar ? <img
                    src={avatar}
                    alt={first_name || "name"}
                    className="w-20 h-20 sm:w-28 sm:h-28 md:h-32 md:w-32 group-hover:scale-[1.05] transition bg-white group-hover:bg-transparent"
                    loading="lazy"
                /> : <FaRobot className="text-gray-300 w-20 h-20 sm:w-28 sm:h-28 md:h-32 md:w-32 p-4 bg-white group-hover:bg-transparent" />}
            </div>
            <div className="flex flex-col justify-center">
                <h3 className="text-xl sm:text-2xl text-center font-medium">{truncate(`${first_name} ${last_name}`, 20)}</h3>
                <div className="flex gap-1 justify-start items-center sm:justify-center mt-1">
                    <CiPhone className="w-4 h-4 sm:w-5 sm:h-5" color="gray" />
                    <h3 className="text-sm md:text-base font-normal text-gray-700">{phone || NOT_AVAILABLE}</h3>
                </div>
            </div>
        </Link>
    );
});

export default ContactCard;
