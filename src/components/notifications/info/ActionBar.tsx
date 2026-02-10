import React from "react";
import * as S from "../../../page/notifications/info/style";

interface ActionBarProps {
  onBackToList: () => void;
}

export function ActionBar({ onBackToList }: ActionBarProps) {
  return (
    <S.ActionBar>
      <S.ListButton onClick={onBackToList}>목록으로</S.ListButton>
    </S.ActionBar>
  );
}
