import { useState, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import * as Style from "./style";
import {
  useSolveForm,
  useProblem,
  useCourse,
  useGrading,
  useResizePanel,
} from "../../../hooks/solve";
import {
  SolveHeader,
  ProblemDescription,
  CodeEditor,
  ResultPanel,
  ProblemSidebar,
} from "../../../components/solve";

export default function SolvePage() {
  const { courseId, problemId } = useParams<{
    courseId?: string;
    problemId?: string;
  }>();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeResultTab, setActiveResultTab] = useState<"result" | "tests">(
    "result",
  );
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const {
    control,
    currentLanguageOption,
    handleCodeChange,
    handleLanguageChange,
    getValues,
    languageOptions,
  } = useSolveForm({ storageKey: `course_${courseId}`, problemId });

  const {
    problem,
    status: problemStatus,
    error: problemError,
    sampleInput,
    sampleOutput,
    problemSections,
  } = useProblem({ problemId });

  const { problems: courseProblems } = useCourse({ courseId });

  const { isSubmitting, terminalOutput, gradingDetails, submitCode } =
    useGrading({ problemId });

  const {
    containerRef,
    rightPanelWidth,
    isResizing,
    terminalHeight,
    startResizing,
  } = useResizePanel({ isSidebarOpen });

  const handleSubmitCode = () => {
    const { code, language } = getValues();
    submitCode(code, language);
  };

  const toggleSidebar = () => setIsSidebarOpen((v) => !v);
  const handleExitSolvePage = () => navigate(`/courses/${courseId}`);
  const handleSidebarItemClick = (pid: number) =>
    navigate(`/courses/${courseId}/solve/${pid}`);

  return (
    <Style.SolveContainer ref={containerRef}>
      <ToastContainer position="top-right" theme="dark" autoClose={2500} />

      <SolveHeader
        problemName={problem?.name}
        isLoading={problemStatus === "loading"}
        languageOptions={languageOptions}
        control={control}
        onLanguageChange={handleLanguageChange}
        onBack={handleExitSolvePage}
        rightContent={
          <Style.MenuButton ref={menuButtonRef} onClick={toggleSidebar}>
            ☰
          </Style.MenuButton>
        }
      />

      <Style.PageContent
        style={{ paddingRight: isSidebarOpen ? "250px" : "0" }}
      >
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

        {isSidebarOpen && (
          <ProblemSidebar
            problems={courseProblems}
            currentProblemId={problemId}
            onProblemClick={handleSidebarItemClick}
          />
        )}
      </Style.PageContent>
    </Style.SolveContainer>
  );
}
