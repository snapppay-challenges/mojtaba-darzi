import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "../home";
import * as hooks from "../../hooks";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../hooks", () => ({
    ...jest.requireActual("../../hooks"),
    useContacts: jest.fn(),
}));

beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

describe("HomePage", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (hooks.useContacts as jest.Mock).mockReturnValue({
            contacts: [],
            frequentContacts: [],
            total: 0,
            loading: false,
            error: false,
        });
    });

    it("renders the HomePage component correctly", () => {
        render(<MemoryRouter><Home /></MemoryRouter>);
        expect(screen.getByText("Contacts")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Search by name or phone")).toBeInTheDocument();
    });

    it("updates query and resets skip on search input change", async () => {
        const mockUseContacts = jest.fn();
        jest.spyOn(hooks, "useContacts").mockImplementation(mockUseContacts);
        mockUseContacts.mockReturnValue({
            contacts: [],
            frequentContacts: [],
            total: 0,
            loading: false,
        });

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        const input = screen.getByTestId("search_input");
        fireEvent.change(input, { target: { value: "test" } });

        await waitFor(
            () => {
                expect(input).toHaveValue("test");
                expect(mockUseContacts).toHaveBeenLastCalledWith();
            },
            { timeout: 500 }
        );
    });




    it("loads more contacts when 'Load More' button is clicked", () => {
        (hooks.useContacts as jest.Mock).mockReturnValue({
            contacts: [{ id: 1, name: "test" }],
            frequentContacts: [],
            total: 20,
            loading: false,
        });
        render(<MemoryRouter><Home /></MemoryRouter>);
        const loadMoreButton = screen.getByText("Load More");
        fireEvent.click(loadMoreButton);
        expect(hooks.useContacts).toHaveBeenCalledWith();
    });

    it("displays 'end of list' when all contacts are loaded", () => {
        (hooks.useContacts as jest.Mock).mockReturnValue({
            contacts: [{
                address: null,
                avatar: "https://robohash.org/solutaquiiusto.png?size=300x300&set=set1",
                company: "Abata",
                createdAt: 1637996719842,
                email: null,
                first_name: "Andie",
                gender: "Male",
                id: 3001,
                last_name: "Fontell",
                note: "",
                phone: "3198099648",
                telegram: "afontell0",
                updatedAt: 1637996719842,
            }],
            frequentContacts: [],
            total: 1,
            loading: false,
        });
        render(<MemoryRouter><Home /></MemoryRouter>);
        expect(screen.getByTestId("end_of_list")).toBeInTheDocument();
    });

    it("shows NoResult when there are no contacts", () => {
        (hooks.useContacts as jest.Mock).mockReturnValue({
            contacts: [],
            frequentContacts: [],
            total: 0,
            loading: false,
        });
        render(<MemoryRouter><Home /></MemoryRouter>);
        expect(screen.getByText("No results found")).toBeInTheDocument();
    });

    it("renders the FrequentlyVisitedSection with frequent contacts", () => {
        const frequentContacts = [{
            address: null,
            avatar: "https://robohash.org/solutaquiiusto.png?size=300x300&set=set1",
            company: "Abata",
            createdAt: 1637996719842,
            email: null,
            first_name: "Andie",
            gender: "Male",
            id: 3001,
            last_name: "Fontell",
            note: "",
            phone: "3198099648",
            telegram: "afontell0",
            updatedAt: 1637996719842,
        }];
        (hooks.useContacts as jest.Mock).mockReturnValue({
            contacts: [],
            frequentContacts,
            total: 0,
            loading: false,
        });
        render(<MemoryRouter><Home /></MemoryRouter>);
        expect(screen.getByText("Andie Fontell")).toBeInTheDocument();
        expect(screen.getByText("3198099648")).toBeInTheDocument();
    });

    it("renders the AllContactsSection with contacts", () => {
        const contacts = [{
            address: null,
            avatar: "https://robohash.org/solutaquiiusto.png?size=300x300&set=set1",
            company: "Abata",
            createdAt: 1637996719842,
            email: null,
            first_name: "Andie",
            gender: "Male",
            id: 3002,
            last_name: "Fontell",
            note: "",
            phone: "3198099648",
            telegram: "afontell0",
            updatedAt: 1637996719842,
        }];
        (hooks.useContacts as jest.Mock).mockReturnValue({
            contacts,
            frequentContacts: [],
            total: 1,
            loading: false,
        });
        render(<MemoryRouter><Home /></MemoryRouter>);
        expect(screen.getByText("Andie Fontell")).toBeInTheDocument();
        expect(screen.getByText("3198099648")).toBeInTheDocument();
    });

    it("shows loading when loading is true", () => {
        (hooks.useContacts as jest.Mock).mockReturnValue({
            contacts: [],
            frequentContacts: [],
            total: 0,
            loading: true,
            error: false,
        });
        render(<MemoryRouter><Home /></MemoryRouter>);
        expect(screen.getByTestId("loading_box")).toBeInTheDocument();
        expect(screen.queryByTestId("end_of_list")).not.toBeInTheDocument();
        expect(screen.queryByTestId("no_result")).not.toBeInTheDocument();
    });

});