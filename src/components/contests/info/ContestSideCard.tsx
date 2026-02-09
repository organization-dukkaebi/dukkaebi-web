import * as S from "../../../page/contests/info/style";

interface ContestSideCardProps {
  title: string;
  startDate: string;
  problemCount: number;
  onStartTest: () => void;
}

export const ContestSideCard = ({
  title,
  startDate,
  problemCount,
  onStartTest,
}: ContestSideCardProps) => {
  return (
    <S.ContestInfoCard>
      <S.CardContent>
        <S.CardInfo>
          <S.CardTitle>{title}</S.CardTitle>
          <S.CardDetails>
            <S.CardDetail>시작 일시 : {startDate} 12:00</S.CardDetail>
            <S.CardDetail>총 {problemCount}문제</S.CardDetail>
          </S.CardDetails>
        </S.CardInfo>

        <S.StartButton onClick={onStartTest}>
          코딩테스트 시작하기
        </S.StartButton>
      </S.CardContent>
    </S.ContestInfoCard>
  );
};
