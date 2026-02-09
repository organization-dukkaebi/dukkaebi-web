import * as S from "../../page/contests/list/style";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageNumbers: number[];
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  pageNumbers,
  onPageChange,
  onPrevPage,
  onNextPage,
}: PaginationProps) => {
  return (
    <S.Pagination>
      <S.PaginationButton disabled={currentPage === 1} onClick={onPrevPage}>
        <svg width="24" height="24">
          <path
            fill="none"
            stroke="#BDBDBD"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14 7l-5 5l5 5"
          />
        </svg>
      </S.PaginationButton>

      <S.PaginationNumbers>
        {pageNumbers.map((num) => (
          <S.PageNumber
            key={num}
            $active={num === currentPage}
            onClick={() => onPageChange(num)}
          >
            {num}
          </S.PageNumber>
        ))}
      </S.PaginationNumbers>

      <S.PaginationButton
        disabled={currentPage === totalPages}
        onClick={onNextPage}
      >
        <svg width="24" height="24">
          <path
            fill="none"
            stroke="#BDBDBD"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m10 17l5-5l-5-5"
          />
        </svg>
      </S.PaginationButton>
    </S.Pagination>
  );
};
