import { ContactType } from "../types/ContactType";

// retrieves frequently visited contacts from localStorage by a given key.
export const getFrequentlyVisited = (key: string): ContactType[] => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

// Adds a contact to the frequently visited list in localStorage, ensuring no duplicates and a max length of 4.
export const addFrequentlyVisited = (key: string, contact: ContactType): void => {
    let visited = getFrequentlyVisited(key);
    visited = visited.filter((c) => c.id !== contact.id); // remove duplicates.
    visited.unshift(contact); // add the new contact at the top.
    if (visited.length > 4) {
        visited.splice(4); // limit the list to 4 items.
    }
    localStorage.setItem(key, JSON.stringify(visited))
};