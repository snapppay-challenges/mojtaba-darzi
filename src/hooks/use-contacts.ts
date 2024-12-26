import { useState, useEffect } from "react";
import { getFrequentlyVisited } from "../utils/storage";
import { FREQUENTLY_VISITED_CONTACTS } from "../contstant/storageKeys";
import useDebouncedValue from "./use-debounced-value";
import { fetchContacts } from "../services";
import { ContactType } from "../types";

const LIMIT = 10; // Number of contacts to fetch per request.

const useContacts = () => {
    const [contacts, setContacts] = useState<ContactType[]>([]);
    const [frequentContacts, setFrequentContacts] = useState<ContactType[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [skip, setSkip] = useState<number>(0); // tracks the pagination offset.

    const debouncedQuery = useDebouncedValue(query, 300); // debounced query to optimize API calls.

    // load more contacts by increasing the offset.
    const handleLoadMore = () => setSkip((prev) => prev + LIMIT);

    // updates search query and resets pagination.
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setSkip(0);
    };

    // fetch contacts whenever dependencies change.
    useEffect(() => {
        setLoading(true);
        setError(false);
        fetchContacts(LIMIT, skip, debouncedQuery)
            .then((data) => {
                if (skip === 0) {
                    setContacts(data.items); // replace contacts if on first page.
                } else {
                    setContacts((prev: ContactType[]) => [...prev, ...data.items]); // append new contacts.
                }
                setTotal(data.meta.total); // update total contacts count.
                setFrequentContacts(getFrequentlyVisited(FREQUENTLY_VISITED_CONTACTS)); // load frequently visited.
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [LIMIT, skip, debouncedQuery]);

    return { contacts, frequentContacts, total, loading, error, handleLoadMore, handleSearchChange, query };
};

export default useContacts;
