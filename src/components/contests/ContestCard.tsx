import * as S from "../../page/contests/style";

interface Contest {
  code: string;
  title: string;
  dDay: string;
  participantCount: number;
  status: "JOINABLE" | "JOINED" | "ENDED";
  image: string;
}

interface ContestCardProps {
  contest: Contest;
  onClick: (code: string) => void;
  defaultImage: string;
}

export const ContestCard = ({
  contest,
  onClick,
  defaultImage,
}: ContestCardProps) => {
  return (
    <S.ContestCard onClick={() => onClick(contest.code)}>
      <S.CardImageWrapper>
        <S.CardImage
          src={contest.image ? contest.image : defaultImage}
          alt={contest.title}
        />
      </S.CardImageWrapper>
      <S.CardContent>
        <S.CardTitle>{contest.title}</S.CardTitle>
        <S.CardInfo>
          {contest.dDay} ・ {contest.participantCount}명 참여중
        </S.CardInfo>
      </S.CardContent>
    </S.ContestCard>
  );
};
