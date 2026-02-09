import React from "react";
import * as S from "../../../page/courses/style";

// 이 컴포넌트는 코스 카드 그리드(UI 덩어리)를 분리하기 위해 생성되었습니다.
// 페이지의 상태(로딩, 필터된 코스, 페이지 계산 등)와 navigate는 props로 받습니다.

interface CourseItem {
  id: string;
  title: string;
  desc?: string;
  image?: string;
  level?: string;
  lessonCount?: number;
  tags?: string[];
  progress?: number;
  status?: "inprogress" | "completed";
}

interface Props {
  loading: boolean;
  filteredCourses: CourseItem[];
  currentPage: number;
  itemsPerPage: number;
  navigate: (path: string) => void;
}

const CourseGrid: React.FC<Props> = ({ loading, filteredCourses, currentPage, itemsPerPage, navigate }) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

  return (
    <S.CourseGrid>
      {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <S.CourseCard key={`ph-${i}`} style={{ opacity: 0.7 }}>
              <S.CourseDifficultyLabel style={{ background: "#f0f0f0", height: 16 }} />
              <S.CourseTitle style={{ background: "#f0f0f0", height: 18 }} />
              <S.CourseTagsWrapper>
                <S.CourseTagChip style={{ background: "#f6f6f6", height: 24 }} />
              </S.CourseTagsWrapper>
              <S.CourseProgressSection>
                <S.CourseProgressPercent style={{ background: "#f0f0f0", height: 12 }} />
                <S.CourseProgressBar>
                  <S.CourseProgressFill $percent={0} />
                </S.CourseProgressBar>
              </S.CourseProgressSection>
            </S.CourseCard>
          ))
        : paginatedCourses.map((c) => (
            <S.CourseCard key={c.id} onClick={() => navigate(`/courses/${c.id}`)}>
              <S.CourseDifficultyLabel>난이도 : {c.level ?? "-"}</S.CourseDifficultyLabel>
              <S.CourseTitle>{c.title}</S.CourseTitle>

              <S.CourseTagsWrapper>
                {(c.tags ?? []).slice(0, 4).map((t: string) => (
                  <S.CourseTagChip key={t}>#{t}</S.CourseTagChip>
                ))}
              </S.CourseTagsWrapper>

              <S.CourseProgressSection>
                <S.CourseProgressPercent>{c.progress ?? 0}%</S.CourseProgressPercent>
                <S.CourseProgressBar>
                  <S.CourseProgressFill $percent={c.progress ?? 0} />
                </S.CourseProgressBar>
              </S.CourseProgressSection>
            </S.CourseCard>
          ))}
    </S.CourseGrid>
  );
};

export default CourseGrid;
