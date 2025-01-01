import React, { memo } from "react";
import { ContactType } from "../../types/ContactType";
import ContactFrequentlyCard from "./contact-frequently-card";

type FrequentlyVisitedSectionProps = {
  frequentContacts: ContactType[];
};

const FrequentlyVisitedSection = memo(
  ({ frequentContacts }: FrequentlyVisitedSectionProps) => {
    /*
        Ali_BM_NOTE_2:
            could be simplified as: return !frequentContacts.length ? null : ...
    */

    if (frequentContacts.length === 0) return null;

    return (
      <div className="mb-4 px-4">
        <div className="flex gap-2 overflow-x-auto -ml-4 -mr-4 pl-4 pr-4">
          {frequentContacts.map((contact) => (
            <ContactFrequentlyCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
    );
  }
);

export default FrequentlyVisitedSection;
