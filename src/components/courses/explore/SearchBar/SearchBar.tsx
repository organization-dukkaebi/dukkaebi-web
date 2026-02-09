import type { ChangeEvent } from "react";
import React from "react";
import * as S from '../../../../page/courses/explore/style';
import SearchIcon from '../../../../assets/image/problems/search.png';

// 이 컴포넌트는 페이지의 검색 입력 UI를 분리한 것입니다.
// 분리 목적: JSX 기준의 의미 있는 UI 덩어리를 분리하여 파일 구조를 명확히 하기 위함입니다.
// 컴포넌트는 페이지의 상태를 직접 다루지 않고, value/onChange를 props로 받아 처리합니다.

interface Props {
  query: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ query, onChange }: Props) {
  return (
    <S.SearchBar>
      <S.SearchInput
        placeholder="대회 이름을 검색하세요..."
        value={query}
        onChange={onChange}
      />
      <S.SearchIcon aria-hidden>
        <img src={SearchIcon} alt="검색" />
      </S.SearchIcon>
    </S.SearchBar>
  );
}
