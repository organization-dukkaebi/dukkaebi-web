import React from "react";
import * as S from '../../../../page/courses/explore/style';

// 이 컴포넌트는 페이지네이션 UI를 분리한 것입니다.
// 분리 목적: 페이지 하단의 페이징 UI를 독립된 컴포넌트로 분리하여 가독성을 높입니다.

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (n: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: Props) {
  if (totalPages <= 0) return null;

  return (
    <S.PaginationWrapper>
      <S.PaginationButton
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        style={{ fontSize: "30px", lineHeight: 0, color: "#BDBDBD" }}
      >
        ‹
      </S.PaginationButton>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <S.PaginationButton
          key={pageNum}
          $active={currentPage === pageNum}
          onClick={() => onPageChange(pageNum)}
        >
          {pageNum}
        </S.PaginationButton>
      ))}

      <S.PaginationButton
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        style={{ fontSize: "30px", lineHeight: 0, color: "#BDBDBD" }}
      >
        ›
      </S.PaginationButton>
    </S.PaginationWrapper>
  );
}
