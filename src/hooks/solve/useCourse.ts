import { useState, useEffect } from "react";
import { z } from "zod";

const API_BASE_URL = (() => {
  const raw = import.meta.env.VITE_API_URL;
  if (!raw || typeof raw !== "string") return "";
  return raw.trim().replace(/\/?$/, "/");
})();

const courseProblemItemSchema = z.object({
  problemId: z.number(),
  name: z.string(),
  difficulty: z.string().optional(),
  solvedResult: z.string().optional(),
});

const courseDetailSchema = z.object({
  courseId: z.number(),
  title: z.string(),
  problems: z.array(courseProblemItemSchema),
});

export type CourseProblemItem = z.infer<typeof courseProblemItemSchema>;

interface UseCourseProps {
  courseId?: string;
}

export function useCourse({ courseId }: UseCourseProps) {
  const [problems, setProblems] = useState<CourseProblemItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!courseId || !API_BASE_URL) return;

    const controller = new AbortController();

    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        const accessToken = localStorage.getItem("accessToken");
        const res = await fetch(`${API_BASE_URL}course/${courseId}`, {
          signal: controller.signal,
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : undefined,
        });
        if (!res.ok) throw new Error("코스 정보 로드 실패");
        const data = courseDetailSchema.parse(await res.json());
        const items = Array.isArray(data?.problems)
          ? data.problems.map((p: CourseProblemItem, idx: number) => ({
              problemId: p?.problemId ?? idx + 1,
              name: p?.name ?? `문제 ${idx + 1}`,
              difficulty: p?.difficulty,
              solvedResult: p?.solvedResult,
            }))
          : [];
        setProblems(items);
      } catch (e) {
        if (!controller.signal.aborted) setProblems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
    return () => controller.abort();
  }, [courseId]);

  return {
    problems,
    isLoading,
  };
}
