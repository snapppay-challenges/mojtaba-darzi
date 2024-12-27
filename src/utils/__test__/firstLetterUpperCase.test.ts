import { firstLetterToUpperCase } from "../firstLetterUpperCase";

describe("firstLetterUpperCase", () => {
    it("should return the string with the first letter capitalized", () => {
        expect(firstLetterToUpperCase("hello")).toBe("Hello");
    });

    it("should handle single character strings", () => {
        expect(firstLetterToUpperCase("a")).toBe("A");
    });

    it("should return an empty string when input is empty", () => {
        expect(firstLetterToUpperCase("")).toBe("");
    });

    it("should handle strings with leading spaces", () => {
        expect(firstLetterToUpperCase("  hello")).toBe("  hello");
    });

    it("should handle strings with all uppercase letters", () => {
        expect(firstLetterToUpperCase("HELLO")).toBe("HELLO");
    });

    it("should handle strings with numbers and special characters", () => {
        expect(firstLetterToUpperCase("123abc")).toBe("123abc");
        expect(firstLetterToUpperCase("!hello")).toBe("!hello");
    });
});
