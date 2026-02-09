import * as S from "../../page/contests/style";
import { ContestCard } from "./ContestCard";

interface Contest {
  code: string;
  title: string;
  dDay: string;
  participantCount: number;
  status: "JOINABLE" | "JOINED" | "ENDED";
  image: string;
}

interface ContestsGridProps {
  contests: Contest[];
  searchTerm: string;
  onCardClick: (code: string) => void;
  defaultImage: string;
}

export const ContestsGrid = ({
  contests,
  searchTerm,
  onCardClick,
  defaultImage,
}: ContestsGridProps) => {
  return (
    <S.ContestsGrid>
      {contests.length > 0 ? (
        contests.map((contest) => (
          <ContestCard
            key={contest.code}
            contest={contest}
            onClick={onCardClick}
            defaultImage={defaultImage}
          />
        ))
      ) : (
        <S.NoResultsMessage>
          {searchTerm
            ? `"${searchTerm}"에 대한 검색 결과가 없습니다.`
            : "아직 대회가 없습니다."}
        </S.NoResultsMessage>
      )}
    </S.ContestsGrid>
  );
};
