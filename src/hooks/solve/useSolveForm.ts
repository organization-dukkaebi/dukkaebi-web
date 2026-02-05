import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const LANGUAGE_OPTIONS = [
  { value: "python", label: "Python", monaco: "python" },
  { value: "cpp", label: "C++", monaco: "cpp" },
  { value: "java", label: "Java", monaco: "java" },
] as const;

const solveFormSchema = z.object({
  code: z.string(),
  language: z.string(),
  chatInput: z.string(),
});

type SolveFormData = z.infer<typeof solveFormSchema>;

interface UseSolveFormProps {
  storageKey?: string;
  problemId?: string;
}

export function useSolveForm({ storageKey, problemId }: UseSolveFormProps) {
  const { control, watch, setValue, getValues } = useForm<SolveFormData>({
    resolver: zodResolver(solveFormSchema),
    defaultValues: {
      code: "",
      language: LANGUAGE_OPTIONS[0].value,
      chatInput: "",
    },
  });

  const code = watch("code");
  const language = watch("language");
  const chatInput = watch("chatInput");

  const [codesByProblem, setCodesByProblem] = useState<Record<string, string>>(
    () => {
      if (!storageKey) return {};
      try {
        const saved = localStorage.getItem(`${storageKey}_codes`);
        return saved ? JSON.parse(saved) : {};
      } catch {
        return {};
      }
    }
  );

  const [langsByProblem, setLangsByProblem] = useState<Record<string, string>>(
    () => {
      if (!storageKey) return {};
      try {
        const saved = localStorage.getItem(`${storageKey}_langs`);
        return saved ? JSON.parse(saved) : {};
      } catch {
        return {};
      }
    }
  );

  const currentLanguageOption =
    LANGUAGE_OPTIONS.find((option) => option.value === language) ||
    LANGUAGE_OPTIONS[0];

  useEffect(() => {
    if (!problemId) return;

    const savedCode = codesByProblem[problemId] || "";
    const savedLang = langsByProblem[problemId] || LANGUAGE_OPTIONS[0].value;

    setValue("code", savedCode);
    setValue("language", savedLang);
  }, [problemId, setValue]);

  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(`${storageKey}_codes`, JSON.stringify(codesByProblem));
  }, [codesByProblem, storageKey]);

  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(`${storageKey}_langs`, JSON.stringify(langsByProblem));
  }, [langsByProblem, storageKey]);

  const handleCodeChange = (value: string) => {
    setValue("code", value);
    if (problemId) {
      setCodesByProblem((prev) => ({
        ...prev,
        [problemId]: value,
      }));
    }
  };

  const handleLanguageChange = (value: string) => {
    setValue("language", value);
    if (problemId) {
      setLangsByProblem((prev) => ({
        ...prev,
        [problemId]: value,
      }));
    }
  };

  const saveToLocalStorage = () => {
    if (!storageKey) return;
    localStorage.setItem(`${storageKey}_codes`, JSON.stringify(codesByProblem));
    localStorage.setItem(`${storageKey}_langs`, JSON.stringify(langsByProblem));
  };

  return {
    control,
    code,
    language,
    chatInput,
    getValues,
    setValue,
    currentLanguageOption,
    handleCodeChange,
    handleLanguageChange,
    saveToLocalStorage,
    languageOptions: LANGUAGE_OPTIONS,
  };
}
