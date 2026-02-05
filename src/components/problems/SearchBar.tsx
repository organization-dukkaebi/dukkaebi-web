/**
 * 문제 검색 입력 UI 영역을 담당하는 컴포넌트
 * 페이지의 검색 상태를 props로 전달받아 UI만 분리함
 */
import * as S from "../../page/problems/style";
import SearchIcon from "../../assets/image/problems/search.png";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  return (
    <S.SearchBox>
      <S.SearchInput
        type="text"
        placeholder="문제 이름을 검색하세요"
        value={searchTerm}
        onChange={onSearch}
      />
      <S.SearchIconContainer>
        <img src={SearchIcon} alt="검색" />
      </S.SearchIconContainer>
    </S.SearchBox>
  );
}
