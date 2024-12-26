import React from "react";
import {
    AllContactsSection,
    BackToTop,
    FrequentlyVisitedSection,
    Header,
    Layout,
    LoadMoreButton,
    NoResult,
    SearchInput,
} from "../components";
import ErrorBox from "../components/common/error-box";
import { useContacts } from "../hooks";

const Home: React.FC = () => {
    const { contacts, frequentContacts, total, loading, error, handleLoadMore, handleSearchChange, query } =
        useContacts();

    const renderLoadMoreSection = () => {
        return (
            <div className="mt-8">
                {(loading || contacts.length < total ? (
                    <LoadMoreButton onClick={handleLoadMore} loading={loading} />
                ) : contacts.length > 0 && contacts.length === total ? (
                    <p className="text-center text-base font-thin" data-testid="end_of_list">
                        - end of list -
                    </p>
                ) : error ? (
                    <ErrorBox />
                ) : contacts.length === 0 ?
                    <NoResult /> : null)
                }
            </div>
        );
    };

    return (
        <Layout title="Contacts" back={false} home={false} >
            <SearchInput value={query} onChange={handleSearchChange} loading={loading} />
            <FrequentlyVisitedSection frequentContacts={frequentContacts} />
            <AllContactsSection contacts={contacts} loading={loading} />
            {renderLoadMoreSection()}
            <BackToTop />
        </Layout>
    );
};

export default Home;
