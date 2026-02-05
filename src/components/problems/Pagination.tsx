/**
 * 페이지네이션 UI를 담당하는 컴포넌트
 * 페이지 이동에 필요한 상태와 핸들러를 props로 그대로 전달받아 사용함
 */
import * as S from "../../page/problems/style";
import ArrowLeftIcon from "../../assets/image/problems/arrow-left.png";
import ArrowRightIcon from "../../assets/image/problems/arrow-right.png";

interface PaginationProps {
  isFirst: boolean;
  isLast: boolean;
  currentPage: number;
  getPageRange: () => number[];
  onPrev: () => void;
  onNext: () => void;
  onChange: (page: number) => void;
}

export function Pagination(props: PaginationProps) {
  const {
    isFirst,
    isLast,
    currentPage,
    getPageRange,
    onPrev,
    onNext,
    onChange,
  } = props;

  return (
    <S.PaginationContainer>
      <S.PaginationButton
        onClick={onPrev}
        style={{
          opacity: isFirst ? 0.5 : 1,
          cursor: isFirst ? "not-allowed" : "pointer",
        }}
      >
        <S.ArrowIcon src={ArrowLeftIcon} alt="이전" />
      </S.PaginationButton>

      <S.PaginationNumbers>
        {getPageRange().map((page) => (
          <S.PaginationNumber
            key={page}
            data-is-active={page === currentPage + 1}
            onClick={() => onChange(page)}
            style={{ cursor: "pointer" }}
          >
            {page}
          </S.PaginationNumber>
        ))}
      </S.PaginationNumbers>

      <S.PaginationButton
        onClick={onNext}
        style={{
          opacity: isLast ? 0.5 : 1,
          cursor: isLast ? "not-allowed" : "pointer",
        }}
      >
        <S.ArrowIcon src={ArrowRightIcon} alt="다음" />
      </S.PaginationButton>
    </S.PaginationContainer>
  );
}
