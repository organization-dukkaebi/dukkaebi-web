import React from "react";
import * as S from "../../../page/courses/style";

// 이 컴포넌트는 페이지 상단의 프로필 정보와 진행도 바(UI 덩어리)를 분리하기 위해 생성되었습니다.
// 페이지의 상태와 헬퍼(이미지/스타일 결정 함수)는 props로 받아 렌더링만 수행합니다.

interface UserInfo {
  id: number;
  nickname: string;
  score: number;
  growth: string;
}

interface Props {
  userInfo: UserInfo | null;
  courseCounts: { total: number; completed: number };
  getAvatarImage: (growth?: string) => string;
  getGrowthStyle: (growth?: string) => { text: string; color: string };
}

const ProfileSection: React.FC<Props> = ({
  userInfo,
  courseCounts,
  getAvatarImage,
  getGrowthStyle,
}) => {
  return (
    <S.ProfileRow>
      <S.Avatar
        src={userInfo ? getAvatarImage(userInfo.growth) : undefined}
        alt="avatar"
      />

      <S.ProfileInfo>
        <div style={{ display: "flex", alignItems: "center" }}>
          <S.ProfileName>{userInfo?.nickname}</S.ProfileName>
          {userInfo?.growth && (
            <S.ProfileTitle style={{ color: getGrowthStyle(userInfo.growth).color }}>
              ・ {getGrowthStyle(userInfo.growth).text}
            </S.ProfileTitle>
          )}
        </div>
      </S.ProfileInfo>

      <S.VerticalDivider />

      <S.ProgressWrapper>
        <S.ProgressLabel>
          <div style={{ fontWeight: 700, color: "#1d1d1d" }}>나의 학습 진행도</div>
          <div style={{ color: "#bdbdbd", fontSize: 13 }}>
            현재 {courseCounts.total}개의 코스 중 {courseCounts.completed} 개 코스 완료
          </div>
        </S.ProgressLabel>

        <S.ProgressBarRow>
          <S.ProgressBar>
            <S.ProgressFill
              $percent={
                courseCounts.total > 0
                  ? Math.round((courseCounts.completed / courseCounts.total) * 100)
                  : 0
              }
            />
          </S.ProgressBar>
          <S.ProgressPercentText>
            {courseCounts.total > 0
              ? Math.round((courseCounts.completed / courseCounts.total) * 100)
              : 0}
            % 진행
          </S.ProgressPercentText>
        </S.ProgressBarRow>
      </S.ProgressWrapper>
    </S.ProfileRow>
  );
};

export default ProfileSection;
