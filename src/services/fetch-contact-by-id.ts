import { BASE_URL } from "../contstant";
import { ContactType } from "../types";
import axios from "axios";

export const fetchContactById = async (id: string): Promise<ContactType> => {
    const response = await axios.get<ContactType>(`${BASE_URL}/${id}`);
    return response.data;
};