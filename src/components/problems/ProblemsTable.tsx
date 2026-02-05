/**
 * 문제 목록 테이블 UI를 담당하는 컴포넌트
 * 문제 데이터와 이동 로직을 props로 그대로 전달받아 렌더링만 수행함
 */

import type { NavigateFunction } from "react-router-dom";
import * as S from "../../page/problems/style";
import SuccessIcon from "../../assets/image/problems/success.png";
import FailIcon from "../../assets/image/problems/fail.png";
import GoldIcon from "../../assets/image/problems/difficulty/gold.png";
import SilverIcon from "../../assets/image/problems/difficulty/silver.png";
import CopperIcon from "../../assets/image/problems/difficulty/copper.png";
import JadeIcon from "../../assets/image/problems/difficulty/jade.png";
import IronIcon from "../../assets/image/problems/difficulty/iron.png";

interface Problem {
  id: number;
  title: string;
  difficulty: number;
  completedCount: number;
  successRate: number;
  solved: boolean;
  failed: boolean;
}

interface ProblemsTableProps {
  problems: Problem[];
  navigate: NavigateFunction;
}

export function ProblemsTable({ problems, navigate }: ProblemsTableProps) {
  const difficultyLabels: Record<number, string> = {
    1: "금",
    2: "은",
    3: "동",
    4: "철",
    5: "옥",
  };

  const difficultyImages: Record<number, string> = {
    1: GoldIcon,
    2: SilverIcon,
    3: CopperIcon,
    4: IronIcon,
    5: JadeIcon,
  };

  return (
    <S.TableContainer>
      <S.TableHeader>
        <S.TableHeaderCell>상태</S.TableHeaderCell>
        <S.TableHeaderCell>제목</S.TableHeaderCell>
        <S.TableHeaderCellRight>난이도</S.TableHeaderCellRight>
        <S.TableHeaderCellRight>완료한 사람</S.TableHeaderCellRight>
        <S.TableHeaderCellRight>정답률</S.TableHeaderCellRight>
      </S.TableHeader>

      <S.TableBody>
        {problems.map((problem, index) => (
          <S.TableRow
            key={problem.id}
            onClick={() => navigate(`/solve/${problem.id}`)}
            data-is-last={index === problems.length - 1}
          >
            <S.TableCell>
              {(problem.solved && (
                <S.StatusIcon src={SuccessIcon} alt="해결됨" />
              )) ||
                (problem.failed && <S.StatusIcon src={FailIcon} alt="실패" />)}
            </S.TableCell>
            <S.TableCell>{problem.title}</S.TableCell>
            <S.TableCellRight>
              <S.DifficultyImage
                src={difficultyImages[problem.difficulty]}
                alt={difficultyLabels[problem.difficulty]}
              />
            </S.TableCellRight>
            <S.TableCellRight>{problem.completedCount}명</S.TableCellRight>
            <S.TableCellRight>{problem.successRate}%</S.TableCellRight>
          </S.TableRow>
        ))}
      </S.TableBody>
    </S.TableContainer>
  );
}
