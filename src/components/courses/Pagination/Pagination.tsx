import React from "react";
import * as S from "../../../page/courses/style";

// 이 컴포넌트는 페이지네이션 UI를 분리하기 위해 생성되었습니다.
// 현재 페이지, 전체 페이지 수, 페이지 변경 핸들러를 props로 받습니다.

interface Props {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ totalPages, currentPage, handlePageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <S.PaginationWrapper>
      <S.PaginationButton
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        style={{ fontSize: "30px", lineHeight: 0, color: "#BDBDBD" }}
      >
        ‹
      </S.PaginationButton>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <S.PaginationButton key={page} $active={currentPage === page} onClick={() => handlePageChange(page)}>
          {page}
        </S.PaginationButton>
      ))}

      <S.PaginationButton
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        style={{ fontSize: "30px", lineHeight: 0, color: "#BDBDBD" }}
      >
        ›
      </S.PaginationButton>
    </S.PaginationWrapper>
  );
};

export default Pagination;
