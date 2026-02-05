import { useState, useEffect } from "react";
import { z } from "zod";

const API_BASE_URL = (() => {
  const raw = import.meta.env.VITE_API_URL;
  if (!raw || typeof raw !== "string") return "";
  return raw.trim().replace(/\/?$/, "/");
})();

const problemDetailSchema = z.object({
  name: z.string(),
  description: z.string(),
  input: z.string(),
  output: z.string(),
  exampleInput: z.string(),
  exampleOutput: z.string(),
});

export type ProblemDetail = z.infer<typeof problemDetailSchema>;

type ProblemStatus = "idle" | "loading" | "success" | "error";

interface UseProblemProps {
  problemId?: string;
}

export function useProblem({ problemId }: UseProblemProps) {
  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [status, setStatus] = useState<ProblemStatus>("idle");
  const [error, setError] = useState("");
  const [sampleInput, setSampleInput] = useState("");
  const [sampleOutput, setSampleOutput] = useState("");

  useEffect(() => {
    if (!problemId) {
      setProblem(null);
      setStatus("error");
      setError("문제를 불러오기 위해 problemId가 필요합니다.");
      setSampleInput("");
      setSampleOutput("");
      return;
    }

    if (!API_BASE_URL) {
      setStatus("error");
      setError("서버 주소가 설정되어 있지 않습니다.");
      return;
    }

    const controller = new AbortController();

    const fetchProblem = async () => {
      setStatus("loading");
      setError("");
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(`${API_BASE_URL}problems/${problemId}`, {
          signal: controller.signal,
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : undefined,
        });
        if (!response.ok) throw new Error("문제 정보를 불러오지 못했습니다.");
        const data = problemDetailSchema.parse(await response.json());
        setProblem(data);
        setStatus("success");
      } catch (err) {
        if (controller.signal.aborted) return;
        setStatus("error");
        setError(err instanceof Error ? err.message : "오류 발생");
      }
    };

    fetchProblem();
    return () => controller.abort();
  }, [problemId]);

  useEffect(() => {
    if (!problem) return;
    setSampleInput(problem.exampleInput || "");
    setSampleOutput(problem.exampleOutput || "");
  }, [problem]);

  const problemSections = problem
    ? [
        { title: "문제 설명", content: problem.description },
        { title: "입력", content: problem.input },
        { title: "출력", content: problem.output },
      ]
    : [];

  return {
    problem,
    status,
    error,
    sampleInput,
    sampleOutput,
    problemSections,
  };
}
