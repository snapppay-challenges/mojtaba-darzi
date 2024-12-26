import { FREQUENTLY_VISITED_CONTACTS } from "../contstant";
import { fetchContactById } from "../services";
import { ContactType } from "../types";
import { addFrequentlyVisited } from "../utils";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useContactDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [contact, setContact] = useState<ContactType>({
        id: null,
        first_name: "",
        last_name: "",
        email: "",
        telegram: "",
        gender: "",
        company: "",
        address: "",
        createdAt: 0,
        updatedAt: 0,
        note: "",
        phone: "",
        avatar: "",
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id || isNaN(Number(id))) {
            navigate("/");
            return;
        }

        setLoading(true);
        setError(false);
        fetchContactById(id)
            .then((data) => {
                setContact(data);
                addFrequentlyVisited(FREQUENTLY_VISITED_CONTACTS, data);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => setLoading(false));
    }, [id, navigate]);

    return { contact, loading, error };
};

export default useContactDetails