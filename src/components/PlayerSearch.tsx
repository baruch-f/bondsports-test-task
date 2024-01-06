import React, { FC } from 'react';
import styled from 'styled-components';

const SearchInput = styled.input`
    width: 30%;
    text-align: left;
    color: #000;
    padding: 0.25rem;
`;

interface IPlayerSearchProps {
    searchText: string;
    setSearchText: (s: string) => void;
}

const PlayerSearch: FC<IPlayerSearchProps> = ({ searchText, setSearchText }) => {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    return <SearchInput autoFocus value={searchText} onChange={handleSearch} placeholder="Search player" />;
};

export default PlayerSearch;
