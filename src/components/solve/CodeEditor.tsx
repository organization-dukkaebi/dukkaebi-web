import type * as monacoEditor from "monaco-editor";
import Editor from "@monaco-editor/react";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import * as Style from "../../page/solve/problems/style";

interface LanguageOption {
  value: string;
  label: string;
  monaco: string;
}

interface CodeEditorProps {
  control: Control<any>;
  currentLanguage: LanguageOption;
  onCodeChange: (value: string) => void;
}

const handleEditorBeforeMount = (monaco: typeof monacoEditor) => {
  monaco.editor.defineTheme("dukkaebi-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#263238",
      "editor.lineHighlightBackground": "#2f3a40",
    },
  });
};

export function CodeEditor({
  control,
  currentLanguage,
  onCodeChange,
}: CodeEditorProps) {
  return (
    <Style.EditorContainer>
      <Controller
        name="code"
        control={control}
        render={({ field }) => (
          <Editor
            height="100%"
            width="100%"
            language={currentLanguage.monaco}
            value={field.value}
            onChange={(value) => onCodeChange(value || "")}
            beforeMount={handleEditorBeforeMount}
            theme="dukkaebi-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineHeight: 1.6,
              wordWrap: "on",
              tabSize: 2,
              scrollBeyondLastLine: false,
            }}
          />
        )}
      />
    </Style.EditorContainer>
  );
}
