import { ContactType } from "@/types";
import { addFrequentlyVisited, getFrequentlyVisited } from "../storage";

describe("FrequentlyVisited Utilities", () => {
    const key = "frequentlyVisited";

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

    const anotherMockContact: ContactType = {
        ...mockContact,
        id: 3326,
        first_name: "Jane",
        last_name: "Doe",
        email: "jane.doe@example.com",
    };

    beforeEach(() => {
        // Mocking localStorage
        Storage.prototype.getItem = jest.fn();
        Storage.prototype.setItem = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockLocalStorageGetItem = (keyToMock: string, dataToReturn: string | null) => {
        (localStorage.getItem as jest.Mock).mockImplementationOnce((key: string) => {
            return key === keyToMock ? dataToReturn : null;
        });
    };

    describe("getFrequentlyVisited", () => {
        it("should return an empty array if no data is found", () => {
            mockLocalStorageGetItem(key, null);

            const result = getFrequentlyVisited(key);
            expect(result).toEqual([]);
            expect(localStorage.getItem).toHaveBeenCalledWith(key);
        });

        it("should return parsed data if it exists in localStorage", () => {
            const mockData = JSON.stringify([mockContact]);
            mockLocalStorageGetItem(key, mockData);

            const result = getFrequentlyVisited(key);
            expect(result).toEqual([mockContact]);
            expect(localStorage.getItem).toHaveBeenCalledWith(key);
        });
    });

    describe("addFrequentlyVisited", () => {
        it("should add a new contact to an empty list", () => {
            mockLocalStorageGetItem(key, null);

            addFrequentlyVisited(key, mockContact);
            expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify([mockContact]));
        });

        it("should add a contact to the beginning of the list", () => {
            const mockData = JSON.stringify([anotherMockContact]);
            mockLocalStorageGetItem(key, mockData);

            addFrequentlyVisited(key, mockContact);
            const expectedData = [mockContact, anotherMockContact];
            expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(expectedData));
        });

        it("should remove duplicate contacts based on id", () => {
            const mockData = JSON.stringify([mockContact, anotherMockContact]);
            mockLocalStorageGetItem(key, mockData);

            addFrequentlyVisited(key, mockContact);

            const expectedData = [mockContact, anotherMockContact];
            expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(expectedData));
        });

        it("should not exceed a maximum length of 4 contacts", () => {
            const mockData = JSON.stringify([
                { ...mockContact, id: 1 },
                { ...mockContact, id: 2 },
                { ...mockContact, id: 3 },
                { ...mockContact, id: 4 },
            ]);
            mockLocalStorageGetItem(key, mockData);

            addFrequentlyVisited(key, mockContact);

            const expectedData = [
                mockContact,
                { ...mockContact, id: 1 },
                { ...mockContact, id: 2 },
                { ...mockContact, id: 3 },
            ];
            expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(expectedData));
        });
    });
});
