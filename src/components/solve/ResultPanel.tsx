import type { ReactNode } from "react";
import type { GradingDetail } from "../../hooks/solve";
import * as Style from "../../page/solve/problems/style";

interface ResultPanelProps {
  activeTab: "result" | "tests";
  onTabChange: (tab: "result" | "tests") => void;
  terminalHeight: number;
  terminalOutput: string;
  gradingDetails: GradingDetail[];
  actionButtons: ReactNode;
}

export function ResultPanel({
  activeTab,
  onTabChange,
  terminalHeight,
  terminalOutput,
  gradingDetails,
  actionButtons,
}: ResultPanelProps) {
  return (
    <Style.ResultContainer>
      <Style.ResultTabs>
        <Style.ResultTab
          type="button"
          $active={activeTab === "result"}
          onClick={() => onTabChange("result")}
        >
          실행 결과
        </Style.ResultTab>
        <Style.ResultTab
          type="button"
          $active={activeTab === "tests"}
          onClick={() => onTabChange("tests")}
        >
          테스트 케이스
        </Style.ResultTab>
      </Style.ResultTabs>

      <Style.Terminal $height={terminalHeight}>
        <Style.TerminalHandle />
        <Style.TerminalOutput>
          {activeTab === "result"
            ? terminalOutput
            : gradingDetails.length === 0
              ? "테스트 케이스가 없습니다. 제출 후 다시 확인하세요."
              : gradingDetails
                  .map(
                    (d, i) =>
                      `#${d.testCaseNumber ?? i + 1}: ${d.passed ? "통과" : "실패"}`,
                  )
                  .join("\n")}
        </Style.TerminalOutput>
      </Style.Terminal>

      <Style.SubmitWrapper>{actionButtons}</Style.SubmitWrapper>
    </Style.ResultContainer>
  );
}
