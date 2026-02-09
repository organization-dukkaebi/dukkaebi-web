import React from "react";
import * as S from '../../../../page/courses/explore/style';

// 이 컴포넌트는 코스 카드 UI를 분리한 것입니다.
// 분리 목적: 카드 단위의 UI 덩어리를 페이지에서 분리하여 파일 구조를 정리합니다.
// 이 컴포넌트는 로딩(스켈레톤) 렌더링과 실제 데이터 렌더링을 props 기반으로 그대로 재현합니다.

export interface CourseItem {
  id: string;
  title: string;
  level?: string;
  keywords?: string[];
  progress?: number;
  status?: string;
}

interface Props {
  course?: CourseItem;
  loading?: boolean;
  onEnter?: () => void;
}

export default function CourseCard({ course, loading, onEnter }: Props) {
  if (loading) {
    return (
      <S.Card style={{ opacity: 0.7 }}>
        <S.CardContent>
          <S.LevelBadge
            style={{
              background: "#f0f0f0",
              height: 14,
              width: "60%",
            }}
          />
          <S.CardTitle
            style={{
              background: "#f0f0f0",
              height: 18,
              width: "90%",
            }}
          />
          <S.KeywordContainer>
            {Array.from({ length: 2 }).map((__, k) => (
              <S.Keyword
                key={k}
                style={{
                  background: "#f6f6f6",
                  borderColor: "#f6f6f6",
                }}
              >
                &nbsp;
              </S.Keyword>
            ))}
          </S.KeywordContainer>
        </S.CardContent>
        <S.SolveButton style={{ background: "#e0e0e0", color: "#bdbdbd" }}>
          로딩 중…
        </S.SolveButton>
      </S.Card>
    );
  }

  if (!course) return null;

  return (
    <S.Card>
      <S.CardContent>
        <S.LevelBadge>난이도 : {course.level ?? "-"}</S.LevelBadge>
        <S.CardTitle>{course.title}</S.CardTitle>
        <S.KeywordContainer>
          {(course.keywords ?? []).length > 0 ? (
            (course.keywords ?? [])
              .slice(0, 4)
              .map((keyword, idx) => (
                <S.Keyword key={idx}>{keyword}</S.Keyword>
              ))
          ) : (
            <S.Keyword>{course.status ?? "참여 가능"}</S.Keyword>
          )}
        </S.KeywordContainer>
      </S.CardContent>
      <S.SolveButton onClick={onEnter}>코스 입장 →</S.SolveButton>
    </S.Card>
  );
}
