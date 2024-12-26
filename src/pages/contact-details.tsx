import React from "react";
import ErrorBox from "../components/common/error-box";
import { Layout } from "../components";
import AvatarSection from "../components/contact-details/avatar-section";
import InfoSection from "../components/contact-details/info-section";
import { useContactDetails } from "../hooks";

const ContactDetails: React.FC = () => {
    const { contact, loading, error } = useContactDetails();
    const renderContent = () => {
        if (error) return <ErrorBox />

        const {
            first_name,
            last_name,
            email,
            telegram,
            gender,
            company,
            address,
            createdAt,
            updatedAt,
            note,
            phone,
            avatar,
        } = contact

        return (
            <div className="flex items-center  flex-col px-4 sm:px-6 mt-8 gap-4 md:flex-row md:items-start md:gap-8">
                <AvatarSection
                    avatar={avatar}
                    first_name={first_name}
                    last_name={last_name}
                    gender={gender}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    loading={loading}
                />
                <InfoSection phone={phone}
                    email={email}
                    telegram={telegram}
                    company={company}
                    address={address}
                    note={note}
                    loading={loading} />
            </div>
        );
    };

    return (
        <Layout title="Contact Details">
            {renderContent()}
        </Layout>
    );
};

export default ContactDetails;

