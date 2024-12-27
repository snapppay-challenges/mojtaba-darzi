import React, { memo } from "react";
import ContactCard from "./contact-card";
import { ContactType } from "../../types";
import ContactLoadingBox from "./contact-loading-box";

type AllContactsSectionProps = {
    contacts: ContactType[];
    loading: boolean;
}

const AllContactsSection = memo(({ contacts, loading }: AllContactsSectionProps) => {
    return (
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 mt-4">
            {contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
            ))}
            {loading && <ContactLoadingBox />}
        </div>
    );
});

export default AllContactsSection;
