import { forwardRef } from "react";
import * as Style from "../../page/solve/problems/style";

interface ProblemItem {
  problemId: number;
  name: string;
}

interface ProblemSidebarProps {
  problems: ProblemItem[];
  currentProblemId?: string;
  onProblemClick: (problemId: number) => void;
  showHeader?: boolean;
}

export const ProblemSidebar = forwardRef<HTMLDivElement, ProblemSidebarProps>(
  ({ problems, currentProblemId, onProblemClick, showHeader = true }, ref) => {
    return (
      <Style.RightSidebar ref={ref}>
        {showHeader && <Style.SidebarHeader>문제 목록</Style.SidebarHeader>}
        <Style.SidebarList>
          {problems.map((p, idx) => {
            const active = String(p.problemId) === String(currentProblemId ?? "");
            return (
              <Style.SidebarItem
                key={p.problemId}
                $active={active}
                onClick={() => onProblemClick(p.problemId)}
              >
                <Style.SidebarItemIndex>
                  {String(idx + 1).padStart(2, "0")}
                </Style.SidebarItemIndex>
                <Style.SidebarItemTitle>{p.name}</Style.SidebarItemTitle>
              </Style.SidebarItem>
            );
          })}
        </Style.SidebarList>
      </Style.RightSidebar>
    );
  }
);

ProblemSidebar.displayName = "ProblemSidebar";
