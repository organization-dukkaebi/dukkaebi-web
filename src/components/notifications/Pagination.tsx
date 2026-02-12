import React from "react";
import arrowLeft from "../../assets/image/notifications/arrow-left.png";
import arrowRight from "../../assets/image/notifications/arrow-right.png";
import {
  Pagination as StyledPagination,
  ArrowButton,
  Pages,
  PageButton,
} from "../../page/notifications/list/style";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageArray: number[];
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, pageArray, onPageChange }: PaginationProps) {
  return (
    <StyledPagination>
      <ArrowButton 
        direction="left" 
        onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <img src={arrowLeft} alt="prev" />
      </ArrowButton>

      <Pages>
        {pageArray.map((page) => (
          <PageButton
            key={page}
            active={currentPage === page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PageButton>
        ))}
      </Pages>

      <ArrowButton 
        direction="right" 
        onClick={() => currentPage < totalPages - 1 && onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
      >
        <img src={arrowRight} alt="next" />
      </ArrowButton>
    </StyledPagination>
  );
}
