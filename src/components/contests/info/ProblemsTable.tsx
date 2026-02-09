import * as S from "../../../page/contestsInfo/style";

interface Problem {
  problemId: number;
  name: string;
  difficulty: "COPPER" | "IRON" | "SLIVER" | "GOLD" | "JADE";
  solvedCount: number;
  correctRate: number;
  solvedResult: "NOT_SOLVED" | "SOLVED" | "FAILED";
  addedAt: string;
}

interface ProblemsTableProps {
  problems: Problem[];
}

export const ProblemsTable = ({ problems }: ProblemsTableProps) => {
  return (
    <S.ProblemsSection>
      <S.ProblemsTable>
        <S.TableHeader>
          <S.TableHeaderLeft>
            <S.HeaderCell>번호</S.HeaderCell>
            <S.HeaderCell>제목</S.HeaderCell>
          </S.TableHeaderLeft>
          <S.TableHeaderRight>
            <S.HeaderCell>제출 상태</S.HeaderCell>
          </S.TableHeaderRight>
        </S.TableHeader>

        <S.TableBody>
          {problems.map((problem, index) => (
            <S.TableRow key={problem.problemId} $isLast={index === problems.length - 1}>
              <S.ProblemNumber>{index + 1}</S.ProblemNumber>
              <S.ProblemTitle>{problem.name}</S.ProblemTitle>
              <S.ProblemStatus $status={problem.solvedResult}>
                {problem.solvedResult === "SOLVED" ||
                problem.solvedResult === "FAILED"
                  ? "제출 완료"
                  : "미제출"}
              </S.ProblemStatus>
            </S.TableRow>
          ))}
        </S.TableBody>
      </S.ProblemsTable>
    </S.ProblemsSection>
  );
};
