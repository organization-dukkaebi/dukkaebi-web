import type { ReactNode } from "react";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import * as Style from "../../page/solve/problems/style";

interface LanguageOption {
  value: string;
  label: string;
}

interface SolveHeaderProps {
  problemName?: string;
  isLoading?: boolean;
  languageOptions: readonly LanguageOption[];
  control: Control<any>;
  onLanguageChange: (value: string) => void;
  onBack: () => void;
  rightContent?: ReactNode;
}

export function SolveHeader({
  problemName,
  isLoading,
  languageOptions,
  control,
  onLanguageChange,
  onBack,
  rightContent,
}: SolveHeaderProps) {
  return (
    <Style.Header>
      <Style.BackButton type="button" onClick={onBack}>
        ‹
      </Style.BackButton>
      <Style.HeaderTitle>
        {problemName ??
          (isLoading ? "문제를 불러오는 중..." : "문제 정보 없음")}
      </Style.HeaderTitle>
      <Style.HeaderActions>
        {rightContent}
        <Controller
          name="language"
          control={control}
          render={({ field }) => (
            <Style.LanguageSelect
              value={field.value}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                onLanguageChange(e.target.value)
              }
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Style.LanguageSelect>
          )}
        />
      </Style.HeaderActions>
    </Style.Header>
  );
}
