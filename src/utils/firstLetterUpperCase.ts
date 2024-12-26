export const firstLetterToUpperCase = (query: string): string => {
    if (!query) return ""
    const [firstLetter, ...rest] = query;
    return firstLetter?.toUpperCase() + rest?.join("")
};