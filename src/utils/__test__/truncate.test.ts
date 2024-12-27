import { truncate } from '../truncate';

describe("truncate", () => {
    it("returns the original text if length is less than maxLength", () => {
        expect(truncate("Hello", 10)).toBe("Hello");
    });

    it("returns the original text if length equals maxLength", () => {
        expect(truncate("Hello", 5)).toBe("Hello");
    });

    it("truncates text longer than maxLength and adds suffix", () => {
        expect(truncate("Hello, World!", 8)).toBe("Hello...");
    });

    it("returns only suffix if maxLength is less than or equal to 0", () => {
        expect(truncate("Hello, World!", 0)).toBe("");
        expect(truncate("Hello, World!", -5)).toBe("He...");
    });

    it("handles maxLength less than suffix length", () => {
        expect(truncate("Hello, World!", 2)).toBe("..");
    });

    it("handles negative maxLength correctly by converting it to positive", () => {
        expect(truncate("Hello, World!", -8)).toBe("Hello...");
    });

    it("supports custom suffix", () => {
        expect(truncate("Hello, World!", 10, "--")).toBe("Hello, W--");
        expect(truncate("Hello, World!", 3, "-")).toBe("He-");
    });

    it("returns only part of suffix if maxLength is less than suffix length", () => {
        expect(truncate("Hello", 2, "---")).toBe("--");
    });
});
