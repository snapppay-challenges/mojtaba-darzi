// truncates a string to a max length, appending a suffix if truncated.
export const truncate = (text: string, maxLength: number, suffix = "...") => {
    if (maxLength < 0) maxLength = Math.abs(maxLength) // ensure positive maxLength.
    if (text.length <= maxLength) {
        return text; // no truncation needed.
    }

    const trimmedLength = maxLength - suffix.length;
    if (trimmedLength <= 0) {
        return suffix.slice(0, maxLength); // return the suffix if no space for text.
    }

    return text.slice(0, trimmedLength) + suffix; // truncated text with suffix.
}