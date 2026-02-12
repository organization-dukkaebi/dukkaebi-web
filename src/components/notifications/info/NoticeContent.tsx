import React from "react";
import * as S from "../../../page/notifications/info/style";

interface NoticeContentProps {
  content: string;
  fileUrl: string;
}

export function NoticeContent({ content, fileUrl }: NoticeContentProps) {
  return (
    <S.NoticeContent>
      <S.ContentText>{content}</S.ContentText>
      {fileUrl && (
        <S.AttachmentImage src={fileUrl} alt="첨부 파일" />
      )}
    </S.NoticeContent>
  );
}
