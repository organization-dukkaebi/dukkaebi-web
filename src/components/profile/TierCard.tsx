import * as S from "../../page/profile/styles";

interface TierCardProps {
  tierImage: string;
  backgroundColor: string;
  tierName: string;
  score: number;
  tierProgress: {
    nextTier: string;
    nextScore: number;
    progress: number;
  };
}

export const TierCard = ({
  tierImage,
  backgroundColor,
  tierName,
  score,
  tierProgress,
}: TierCardProps) => {
  return (
    <S.TierCard $backgroundColor={backgroundColor}>
      <S.TierCharacter src={tierImage} alt="tier character" />
      <S.TierInfo>
        <S.TierBadge>
          <S.TierName>{tierName}</S.TierName>
          {tierProgress.nextTier && (
            <S.TierProgress>
              {tierProgress.nextTier}까지 {tierProgress.nextScore - score}점
            </S.TierProgress>
          )}
          <S.ProgressBarContainer>
            <S.ProgressBarFill progress={tierProgress.progress} />
          </S.ProgressBarContainer>
        </S.TierBadge>
        <S.TierScore>{score}점</S.TierScore>
      </S.TierInfo>
    </S.TierCard>
  );
};
