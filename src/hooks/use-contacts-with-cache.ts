import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getFrequentlyVisited } from "../utils/storage";
import { FREQUENTLY_VISITED_CONTACTS } from "../contstant/storageKeys";
import { fetchContacts } from "../services";
import { ContactType } from "@/types";

const STORAGE_KEY = "contacts_cache";

const useContactsWithCache = () => {
    const [contacts, setContacts] = useState<ContactType[]>([]);
    const [frequentContacts, setFrequentContacts] = useState<ContactType[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get("query") || "";
    const skip = parseInt(searchParams.get("skip") || "0", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const handleLoadMore = () => {
        setSearchParams({ query, skip: (skip + limit).toString(), limit: limit.toString() });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams({ query: e.target.value, skip: "0", limit: limit.toString() });
        setContacts([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    useEffect(() => {
        const cachedData = localStorage.getItem(STORAGE_KEY);
        const parsedCache = cachedData ? JSON.parse(cachedData) : {};

        const fetchContactsData = async () => {
            setLoading(true);
            setError(false);

            try {
                let allContacts = parsedCache[query]?.items || [];

                if (allContacts.length < skip + limit) {
                    const data = await fetchContacts(limit, skip, query);
                    allContacts = [...allContacts.slice(0, skip), ...data.items];

                    parsedCache[query] = {
                        items: allContacts,
                        total: data.meta.total,
                    };
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedCache));
                }

                setContacts(allContacts);
                setTotal(parsedCache[query]?.total || 0);
                setFrequentContacts(getFrequentlyVisited(FREQUENTLY_VISITED_CONTACTS));
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchContactsData();
    }, [query, skip, limit]);

    return { contacts, frequentContacts, total, loading, error, handleLoadMore, handleSearchChange, query };
};

export default useContactsWithCache;
