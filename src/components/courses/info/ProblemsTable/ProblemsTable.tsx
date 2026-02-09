import React from "react";
import * as S from "../../../../page/courses/info/style";

// 이 컴포넌트는 문제 목록 테이블 UI를 분리하기 위해 생성되었습니다.
// 페이지의 상태와 핸들러는 props로 그대로 전달받아 렌더링만 수행합니다.

interface ProblemItem {
  id: number;
  title: string;
  status: "submitted" | "pending" | "failed";
}

interface ProblemsTableProps {
  loading: boolean;
  problems: ProblemItem[];
  showTableRows: boolean;
  error: string | null;
  handleProblemClick: (problemId: number) => void;
}

const ProblemsTable: React.FC<ProblemsTableProps> = ({
  loading,
  problems,
  showTableRows,
  error,
  handleProblemClick,
}) => {
  return (
    <S.TableCard>
      <S.TableHeader>
        <S.HeaderText>번호</S.HeaderText>
        <S.HeaderText>제목</S.HeaderText>
        <S.HeaderText align="right">제출 상태</S.HeaderText>
      </S.TableHeader>

      <S.TableBody>
        {loading ? null : showTableRows ? (
          problems.map((problem, index) => (
            <S.TableRow
              key={problem.id}
              $isLast={index === problems.length - 1}
              $clickable
              onClick={() => handleProblemClick(problem.id)}
            >
              <S.IndexCell>{index + 1}</S.IndexCell>
              <S.TitleCell>{problem.title}</S.TitleCell>
              <S.StatusCell status={problem.status}>
                {problem.status === "submitted"
                  ? "제출 완료"
                  : problem.status === "failed"
                  ? "실패"
                  : "미제출"}
              </S.StatusCell>
            </S.TableRow>
          ))
        ) : (
          <S.TableRow $isLast>
            <S.IndexCell>--</S.IndexCell>
            <S.TitleCell>{error ?? "등록된 문제가 없습니다."}</S.TitleCell>
            <S.StatusCell status="pending">-</S.StatusCell>
          </S.TableRow>
        )}
      </S.TableBody>
    </S.TableCard>
  );
};

export default ProblemsTable;
