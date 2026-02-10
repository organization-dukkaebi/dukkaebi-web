import React from "react";
import search from "../../assets/image/notifications/search.png";
import { SearchBar as StyledSearchBar } from "../../page/notifications/list/style";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
}

export function SearchBar({ searchQuery, onSearchChange, onKeyDown, onSearchClick }: SearchBarProps) {
  return (
    <StyledSearchBar>
      <input
        type="text"
        placeholder="공지사항을 검색하세요.."
        value={searchQuery}
        onChange={onSearchChange}
        onKeyDown={onKeyDown}
      />
      <img src={search} alt="search" onClick={onSearchClick} />
    </StyledSearchBar>
  );
}
