import React from "react";
import * as S from "../../../../page/courses/info/style";

// 이 컴포넌트는 우측 사이드 카드(코스 요약 및 '문제 풀어보기' 버튼) UI를 분리하기 위해 생성되었습니다.
// 페이지의 상태와 핸들러는 props로 그대로 전달받아 렌더링만 수행합니다.

interface SideCardProps {
  title: string;
  questionCount: number;
  level: string;
  handleStartFirstProblem: () => void;
}

const SideCard: React.FC<SideCardProps> = ({
  title,
  questionCount,
  level,
  handleStartFirstProblem,
}) => {
  return (
    <S.SideCard>
      <S.SideCardTitle>{title}</S.SideCardTitle>
      <S.SideCardList>
        <S.SideCardItem>
          <S.SideCardLabel>문제 :</S.SideCardLabel>
          <S.SideCardValue>{questionCount}</S.SideCardValue>
        </S.SideCardItem>
        <S.SideCardItem>
          <S.SideCardLabel>난이도 :</S.SideCardLabel>
          <S.SideCardValue>{level}</S.SideCardValue>
        </S.SideCardItem>
      </S.SideCardList>

      <S.SideCardButton
        type="button"
        fullWidth
        onClick={handleStartFirstProblem}
      >
        문제 풀어보기
      </S.SideCardButton>
    </S.SideCard>
  );
};

export default SideCard;
