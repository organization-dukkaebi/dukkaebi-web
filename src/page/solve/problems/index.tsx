import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import * as Style from "./style";
import { useSolveForm, useProblem, useGrading, useResizePanel } from "../../../hooks/solve";
import { SolveHeader, ProblemDescription, CodeEditor, ResultPanel } from "../../../components/solve";

export default function SolvePage() {
  const { problemId } = useParams<{ problemId?: string }>();
  const navigate = useNavigate();

  const [activeResultTab, setActiveResultTab] = useState<"result" | "tests">("result");

  const {
    control,
    currentLanguageOption,
    handleCodeChange,
    handleLanguageChange,
    getValues,
    languageOptions,
  } = useSolveForm({ problemId });

  const {
    problem,
    status: problemStatus,
    error: problemError,
    sampleInput,
    sampleOutput,
    problemSections,
  } = useProblem({ problemId });

  const { isSubmitting, terminalOutput, gradingDetails, submitCode } =
    useGrading({ problemId });

  const {
    containerRef,
    rightPanelWidth,
    isResizing,
    terminalHeight,
    startResizing,
  } = useResizePanel({});

  const handleSubmitCode = () => {
    const { code, language } = getValues();
    submitCode(code, language);
  };

  const handleExitSolvePage = () => navigate("/problems");

  return (
    <Style.SolveContainer ref={containerRef}>
      <ToastContainer position="top-right" theme="dark" newestOnTop closeOnClick />

      <SolveHeader
        problemName={problem?.name}
        isLoading={problemStatus === "loading"}
        languageOptions={languageOptions}
        control={control}
        onLanguageChange={handleLanguageChange}
        onBack={handleExitSolvePage}
      />

      <Style.PageContent>
        <ProblemDescription
          status={problemStatus}
          error={problemError}
          sections={problemSections}
          sampleInput={sampleInput}
          sampleOutput={sampleOutput}
        />

        <Style.Divider onMouseDown={startResizing} $isResizing={isResizing} />

        <Style.RightPanel $width={rightPanelWidth}>
          <CodeEditor
            control={control}
            currentLanguage={currentLanguageOption}
            onCodeChange={handleCodeChange}
          />

          <ResultPanel
            activeTab={activeResultTab}
            onTabChange={setActiveResultTab}
            terminalHeight={terminalHeight}
            terminalOutput={terminalOutput}
            gradingDetails={gradingDetails}
            actionButtons={
              <Style.SubmitButton
                onClick={handleSubmitCode}
                disabled={isSubmitting || !problemId}
              >
                {isSubmitting ? "채점 중..." : "제출 후 채점하기"}
              </Style.SubmitButton>
            }
          />
        </Style.RightPanel>
      </Style.PageContent>
    </Style.SolveContainer>
  );
}
