import React from "react";
import * as S from "../../../../page/courses/info/style";

// 이 컴포넌트는 페이지의 소개(타이틀, 설명, 태그, 진행률 또는 수강신청 버튼) UI 덩어리를 분리하기 위해 생성되었습니다.
// 로직, 상태, 네이밍은 변경하지 않고 props로 모든 필요한 값을 전달받아 렌더링만 수행합니다.

interface IntroSectionProps {
  courseData: {
    title: string;
    description: string;
    tags: string[];
  };
  progress: number;
  showProgress: boolean;
  joinLoading: boolean;
  handleJoinCourse: () => void;
}

const IntroSection: React.FC<IntroSectionProps> = ({
  courseData,
  progress,
  showProgress,
  joinLoading,
  handleJoinCourse,
}) => {
  return (
    <S.IntroSection>
      <S.IntroContent>
        <S.Title>{courseData.title}</S.Title>
        <S.Description>{courseData.description}</S.Description>
        <S.TagRow>
          {courseData.tags.map((tag) => (
            <S.Tag key={tag}>{tag}</S.Tag>
          ))}
        </S.TagRow>
        {showProgress ? (
          <S.ProgressContainer>
            <S.ProgressBar>
              <S.ProgressFill style={{ width: `${progress}%` }} />
            </S.ProgressBar>
            <S.ProgressText>{progress}% 진행</S.ProgressText>
          </S.ProgressContainer>
        ) : (
          <S.EnrollButton
            type="button"
            onClick={handleJoinCourse}
            disabled={joinLoading}
          >
            {joinLoading ? "신청 중..." : "수강 신청"}
          </S.EnrollButton>
        )}
      </S.IntroContent>
    </S.IntroSection>
  );
};

export default IntroSection;
