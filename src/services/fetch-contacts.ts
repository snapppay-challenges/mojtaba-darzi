import axios from "axios";
import { BASE_URL } from "../contstant";
import { ContactResponseType } from "@/types";

export const fetchContacts = async (
    limit = 10, // number of contacts per request.
    skip = 0, // pagination offset.
    query: string = "",
    sort: string = 'createdAt DESC'
): Promise<ContactResponseType> => {
    // construct filter criteria for API query.
    const where = JSON.stringify({
        or: [
            { first_name: { contains: query } },
            { last_name: { contains: query } },
            { phone: { contains: query } },
        ],
    });

    // API call to fetch contacts with filters and pagination.
    const response = await axios.get<ContactResponseType>(`${BASE_URL}`, {
        params: {
            where,
            sort,
            limit,
            skip,
        },
    });

    return response.data;
};
