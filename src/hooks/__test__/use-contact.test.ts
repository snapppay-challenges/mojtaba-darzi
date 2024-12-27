import { renderHook, act } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import useContacts from "../use-contacts";
import { fetchContacts } from "../../services";
import { getFrequentlyVisited } from "../../utils/storage";

jest.mock("../../services", () => ({
    fetchContacts: jest.fn(), // mock the fetchContacts service to isolate and control its behavior.
}));

jest.mock("../../utils/storage", () => ({
    getFrequentlyVisited: jest.fn(), // mock the storage utility for predictable test outputs.
}));

describe("useContacts", () => {
    const mockContacts = [
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
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks(); // ensure no stale mocks affect the tests.
        (fetchContacts as jest.Mock).mockResolvedValue({
            items: mockContacts, // mock resolved value of fetchContacts for initial test cases.
            meta: { total: mockContacts.length },
        });
        (getFrequentlyVisited as jest.Mock).mockReturnValue(mockContacts); // mock frequently visited data.
    });

    it("should fetch and set contacts on initial render", async () => {
        const { result } = renderHook(() => useContacts()); // render the hook for testing.

        expect(result.current.loading).toBe(true); // ensure loading is true initially.

        await waitFor(() => expect(result.current.loading).toBe(false)); // Wait for loading to complete.

        expect(fetchContacts).toHaveBeenCalledWith(10, 0, ""); // check if fetchContacts was called with correct params.
        expect(result.current.contacts).toEqual(mockContacts); // verify the fetched contacts are set correctly.
    });

    it("should update contacts when query changes", async () => {
        (fetchContacts as jest.Mock).mockResolvedValueOnce({
            items: [], // mock no results for the new query.
            meta: { total: 0 },
        });

        const { result } = renderHook(() => useContacts());

        await waitFor(() => expect(result.current.loading).toBe(false)); // wait for initial loading to complete.

        act(() => {
            result.current.handleSearchChange({
                target: { value: "Non-existent" }, // simulate a query change.
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.query).toBe("Non-existent"); // ensure the query state updates correctly.
        expect(result.current.contacts).toEqual([]); // verify no contacts are returned for the new query.
    });

    it("should append contacts when handleLoadMore is called", async () => {
        const newContact = {
            "first_name": "Derril",
            "last_name": "Dickings",
            "email": null,
            "gender": "Male",
            "phone": "4903847373",
            "note": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
            "telegram": "ddickings2",
            "avatar": "https://robohash.org/quoanimiquod.png?size=300x300&set=set1",
            "company": "Divape",
            "address": null,
            "createdAt": 1637996719842,
            "updatedAt": 1637996719842,
            "id": 3003
        }
        const { result } = renderHook(() => useContacts());

        await waitFor(() => expect(result.current.loading).toBe(false)); // wait for initial loading to complete.

        expect(result.current.contacts).toEqual(mockContacts); // ensure initial contacts are set correctly.
        (fetchContacts as jest.Mock).mockResolvedValueOnce({
            items: [newContact], // mock new data for load more.
            meta: { total: mockContacts.length + 1 },
        });

        await act(async () => {
            result.current.handleLoadMore(); // trigger load more action.
        });
        await waitFor(() => expect(result.current.loading).toBe(false)); // wait for loading to complete.

        expect(fetchContacts).toHaveBeenCalledWith(10, 10, ""); // verify fetchContacts was called with updated offset.
        expect(result.current.contacts).toEqual([ // check if new data is appended correctly.
            ...mockContacts,
            newContact,
        ]);
    });
});
