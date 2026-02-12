import * as S from "../../page/contests/list/style";

interface SearchBarProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ searchTerm, onChange }: SearchBarProps) => {
  return (
    <S.SearchBar>
      <S.SearchInput
        type="text"
        placeholder="대회 이름을 검색하세요"
        value={searchTerm}
        onChange={onChange}
      />
    </S.SearchBar>
  );
};
