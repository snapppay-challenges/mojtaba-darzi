import React, { memo } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import Loading from "./loading";

type SearchInputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    loading: boolean
}

const SearchInput = memo(({ value, onChange, loading }: SearchInputProps) => (
    <div className="relative w-full mb-4 px-4">
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Search by name or phone"
            className="w-full p-3 pl-10 text-sm rounded-xl bg-gray-100 focus:bg-transparent focus:border-blue-500"
            data-testid="search_input"
        />
        <HiMiniMagnifyingGlass className="absolute top-1/2 left-8 transform -translate-y-1/2 text-gray-400" size={16} />
        {value && loading && <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
            <Loading />
        </div>}
    </div>
));

export default SearchInput;