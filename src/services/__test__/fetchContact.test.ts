import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchContacts } from "../fetch-contacts";
import { BASE_URL } from "../../contstant";
import { ContactResponseType } from "../../types";

const mock = new MockAdapter(axios);

describe("fetchContacts", () => {
    afterEach(() => {
        mock.reset();
    });

    it("fetches contacts successfully with default parameters", async () => {
        const mockResponse: ContactResponseType = {
            items: [
                {
                    "first_name": "Andie",
                    "last_name": "Fontell",
                    "email": null,
                    "gender": "Male",
                    "phone": "3198099648",
                    "note": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
                    "telegram": "afontell0",
                    "avatar": "https://robohash.org/solutaquiiusto.png?size=300x300&set=set1",
                    "company": "Abata",
                    "address": null,
                    "createdAt": 1637996719842,
                    "updatedAt": 1637996719842,
                    "id": 3001
                },
                {
                    "first_name": "Brig",
                    "last_name": "Ridwood",
                    "email": "bridwood1@oracle.com",
                    "gender": "Bigender",
                    "phone": "6434605672",
                    "note": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
                    "telegram": null,
                    "avatar": "https://robohash.org/minimaindolorum.png?size=300x300&set=set1",
                    "company": "Twitterwire",
                    "address": null,
                    "createdAt": 1637996719842,
                    "updatedAt": 1637996719842,
                    "id": 3002
                },
            ],
            meta: {
                criteria: null,
                limit: 10,
                skipped: 0,
                total: 2,
            },
        };

        mock.onGet(BASE_URL).reply(200, mockResponse);

        const result = await fetchContacts();

        expect(result).toEqual(mockResponse);
        expect(mock.history.get[0].params).toMatchObject({
            limit: 10,
            skip: 0,
            sort: "createdAt DESC",
        });
    });

    it("fetches contacts with a specific query and pagination", async () => {
        const mockResponse: ContactResponseType = {
            items: [
                {
                    "first_name": "Andie",
                    "last_name": "Fontell",
                    "email": null,
                    "gender": "Male",
                    "phone": "3198099648",
                    "note": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
                    "telegram": "afontell0",
                    "avatar": "https://robohash.org/solutaquiiusto.png?size=300x300&set=set1",
                    "company": "Abata",
                    "address": null,
                    "createdAt": 1637996719842,
                    "updatedAt": 1637996719842,
                    "id": 3001
                }

            ],
            meta: {
                criteria: null,
                limit: 5,
                skipped: 10,
                total: 1,
            },
        };

        mock.onGet(BASE_URL).reply(200, mockResponse);

        const query = "Andie";
        const limit = 5;
        const skip = 10;
        const result = await fetchContacts(limit, skip, query);

        expect(result).toEqual(mockResponse);
        expect(mock.history.get[0].params).toMatchObject({
            where: expect.stringContaining(`"first_name":{"contains":"Andie"}`),
            limit,
            skip,
        });
    });

    it("throws an error if the API call fails", () => {
        mock.onGet(BASE_URL).reply(500);
        expect(fetchContacts()).rejects.toThrow("Request failed with status code 500");
    });
});
