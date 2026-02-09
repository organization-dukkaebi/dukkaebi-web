import * as S from "../../../page/contests/info/style";

interface ContestInfoHeaderProps {
  contestImage: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  participantCount: number;
  progress: number;
}

export const ContestInfoHeader = ({
  contestImage,
  title,
  description,
  startDate,
  endDate,
  participantCount,
  progress,
}: ContestInfoHeaderProps) => {
  return (
    <S.ContestInfoSection>
      <S.ContestInfoContent>
        <S.ContestImage src={contestImage} alt={title || "대회 이미지"} />

        <S.ContestDetails>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <S.ContestTitle>{title}</S.ContestTitle>
            <S.ContestDescription>
              <S.DescriptionText>{description}</S.DescriptionText>
              <S.ContestMeta>
                {startDate} ~ {endDate} ・{participantCount}명 참여중
              </S.ContestMeta>
            </S.ContestDescription>
          </div>

          <S.ProgressSection>
            <S.ProgressBarContainer>
              <S.ProgressBar progress={progress} />
            </S.ProgressBarContainer>
            <S.ProgressText>{progress}%</S.ProgressText>
          </S.ProgressSection>
        </S.ContestDetails>
      </S.ContestInfoContent>
    </S.ContestInfoSection>
  );
};
