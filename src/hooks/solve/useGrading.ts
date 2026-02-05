import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

const API_BASE_URL = (() => {
  const raw = import.meta.env.VITE_API_URL;
  if (!raw || typeof raw !== "string") return "";
  return raw.trim().replace(/\/?$/, "/");
})();

const gradingDetailSchema = z.object({
  testCaseNumber: z.number().optional(),
  passed: z.boolean().optional(),
  input: z.string().optional(),
  expectedOutput: z.string().optional(),
  actualOutput: z.string().optional(),
});

const gradingResultSchema = z.object({
  status: z.string().optional(),
  passedTestCases: z.number().optional(),
  totalTestCases: z.number().optional(),
  executionTime: z.number().optional(),
  errorMessage: z.string().nullable().optional(),
  details: z.array(gradingDetailSchema).optional(),
});

export type GradingDetail = z.infer<typeof gradingDetailSchema>;

type GradingResult = z.infer<typeof gradingResultSchema>;

interface UseGradingProps {
  problemId?: string;
}

export function useGrading({ problemId }: UseGradingProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState(
    "실행 결과가 이곳에 표시됩니다."
  );
  const [gradingDetails, setGradingDetails] = useState<GradingDetail[]>([]);
  const [gradingCacheByProblem, setGradingCacheByProblem] = useState<
    Record<string, GradingDetail[]>
  >({});

  useEffect(() => {
    const key = String(problemId ?? "");
    setGradingDetails(gradingCacheByProblem[key] ?? []);
  }, [problemId, gradingCacheByProblem]);

  useEffect(() => {
    if (problemId) {
      setTerminalOutput("실행 결과가 이곳에 표시됩니다.");
      setGradingDetails([]);
    }
  }, [problemId]);

  const formatGradingResult = (result: GradingResult) => {
    if (!result) return "채점 결과를 불러오지 못했습니다.";

    const statusText = (result.status ?? "").toUpperCase();
    const isAccepted = statusText === "ACCEPTED";
    const lines: string[] = [
      isAccepted ? "정답입니다." : "오답입니다.",
      "",
      `채점 결과: ${statusText || "알 수 없음"}`,
      `통과한 테스트: ${result.passedTestCases ?? 0} / ${result.totalTestCases ?? 0}`,
      `실행 시간: ${result.executionTime ?? "-"}ms`,
    ];

    if (result.errorMessage) {
      lines.push("", `오류 메시지: ${result.errorMessage}`);
    }

    if (result.details && result.details.length > 0) {
      const detail = result.details[0];
      lines.push(
        "",
        `테스트 케이스 ${detail.testCaseNumber ?? "?"} : ${detail.passed ? "통과" : "실패"}`
      );
      lines.push(`입력값: ${(detail.input ?? "X").replace(/\s+$/, "") || "X"}`);
      if (detail.expectedOutput !== undefined) {
        lines.push(`기댓값: ${(detail.expectedOutput ?? "").replace(/\s+$/, "") || "X"}`);
      }
      lines.push(`실제값: ${(detail.actualOutput ?? "").replace(/\s+$/, "") || "X"}`);
    }

    return lines.join("\n");
  };

  const submitCode = useCallback(
    async (code: string, language: string, timeSpentSeconds?: number) => {
      if (!problemId || !code.trim()) return;

      setIsSubmitting(true);
      setTerminalOutput("채점 중입니다...");

      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(`${API_BASE_URL}solve/grading`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
          body: JSON.stringify({
            problemId: Number(problemId),
            code,
            language,
            ...(timeSpentSeconds !== undefined && { timeSpentSeconds }),
          }),
        });

        if (!response.ok) throw new Error("채점 요청 실패");
        const data = gradingResultSchema.parse(await response.json());

        setTerminalOutput(formatGradingResult(data));
        setGradingDetails(data.details || []);
        setGradingCacheByProblem((prev) => ({
          ...prev,
          [String(problemId)]: data.details || [],
        }));

        const passed = Array.isArray(data?.details)
          ? data.details.some((d) => d?.passed === true)
          : false;

        if (passed) {
          toast.success("정답입니다!");
        } else {
          toast.error("오답입니다.");
        }
      } catch (error) {
        setTerminalOutput("오류 발생");
        toast.error("채점 중 오류가 발생했습니다.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [problemId]
  );

  const testCode = useCallback(
    async (code: string, language: string) => {
      if (!problemId || !code.trim()) return;

      setIsTesting(true);
      setTerminalOutput("테스트 중입니다...");

      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(`${API_BASE_URL}solve/test`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
          body: JSON.stringify({
            problemId: Number(problemId),
            code,
            language,
          }),
        });

        if (!response.ok) throw new Error("테스트 요청 실패");
        const data = gradingResultSchema.parse(await response.json());

        setTerminalOutput(formatGradingResult(data));
        setGradingDetails(data.details || []);

        const passed = Array.isArray(data?.details)
          ? data.details.some((d) => d?.passed === true)
          : false;

        if (passed) {
          toast.success("테스트 통과");
        } else {
          toast.error("테스트 실패");
        }
      } catch (error) {
        setTerminalOutput("오류 발생");
        toast.error("테스트 중 오류가 발생했습니다.");
      } finally {
        setIsTesting(false);
      }
    },
    [problemId]
  );

  return {
    isSubmitting,
    isTesting,
    terminalOutput,
    gradingDetails,
    submitCode,
    testCode,
  };
}
