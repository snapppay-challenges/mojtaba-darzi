import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchContactById } from "../fetch-contact-by-id";
import { BASE_URL } from "../../contstant";
import { ContactType } from "../../types";

const mock = new MockAdapter(axios);

describe("fetchContactById", () => {
    afterEach(() => {
        mock.reset();
    });

    it("fetches contact by ID successfully", async () => {
        const contactId = 3325;
        const mockContact: ContactType = {
            address: null,
            avatar: "https://robohash.org/quisquamodioin.png?size=300x300&set=set1",
            company: "Demizz",
            createdAt: 1637996719842,
            email: "pminett90@discuz.net",
            first_name: "Peter",
            gender: "Non-binary",
            id: 3325,
            last_name: "Minett",
            note: "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
            phone: "7955301208",
            telegram: "pminett90",
            updatedAt: 1637996719842,
        };

        mock.onGet(`${BASE_URL}/${contactId}`).reply(200, mockContact);
        const result = await fetchContactById(contactId.toString());
        expect(result).toEqual(mockContact);
    });

    it("throws an error if the contact is not found", async () => {
        const contactId = "999999999999";
        mock.onGet(`${BASE_URL}/${contactId}`).reply(404);
        await expect(fetchContactById(contactId)).rejects.toThrow("Request failed with status code 404");
    });

    it("throws an error for a network issue", async () => {
        const contactId = "123";
        mock.onGet(`${BASE_URL}/${contactId}`).networkError();
        await expect(fetchContactById(contactId)).rejects.toThrow("Network Error");
    });
});
