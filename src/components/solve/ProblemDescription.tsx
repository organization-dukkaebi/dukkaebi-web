import { useRef, useEffect } from "react";
import * as Style from "../../page/solve/problems/style";

interface ProblemSection {
  title: string;
  content: string;
}

interface ProblemDescriptionProps {
  status: "idle" | "loading" | "success" | "error";
  error?: string;
  sections: ProblemSection[];
  sampleInput: string;
  sampleOutput: string;
}

export function ProblemDescription({
  status,
  error,
  sections,
  sampleInput,
  sampleOutput,
}: ProblemDescriptionProps) {
  const exampleInputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!exampleInputRef.current) return;
    const textarea = exampleInputRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [sampleInput]);

  return (
    <Style.LeftPanel>
      <Style.LeftPanelContent>
        {status === "error" && (
          <Style.Section>
            <Style.SectionTitle>알림</Style.SectionTitle>
            <Style.ProblemStatus $variant="error">{error}</Style.ProblemStatus>
          </Style.Section>
        )}
        {status === "loading" && (
          <Style.Section>
            <Style.SectionTitle>알림</Style.SectionTitle>
            <Style.ProblemStatus $variant="info">
              문제를 불러오는 중입니다...
            </Style.ProblemStatus>
          </Style.Section>
        )}
        {sections.map(({ title, content }) => (
          <Style.Section key={title}>
            <Style.SectionTitle>{title}</Style.SectionTitle>
            <Style.SectionText>{content}</Style.SectionText>
          </Style.Section>
        ))}

        <Style.Section>
          <Style.SectionTitle>예시 입력:</Style.SectionTitle>
          <Style.ExampleTextarea
            readOnly
            tabIndex={-1}
            ref={exampleInputRef}
            value={sampleInput}
          />
        </Style.Section>

        <Style.Section>
          <Style.SectionTitle>예시 출력:</Style.SectionTitle>
          <Style.ExampleOutput>{sampleOutput}</Style.ExampleOutput>
        </Style.Section>
      </Style.LeftPanelContent>
    </Style.LeftPanel>
  );
}
