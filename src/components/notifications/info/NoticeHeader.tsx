import React from "react";
import * as S from "../../../page/notifications/info/style";

interface NoticeHeaderProps {
  title: string;
  writer: string;
  createdAt: string;
}

export function NoticeHeader({ title, writer, createdAt }: NoticeHeaderProps) {
  return (
    <S.NoticeHeader>
      <S.Title>{title}</S.Title>
      <S.MetaInfo>
        <S.MetaItem>
          <S.MetaLabel>작성자</S.MetaLabel>
          <S.MetaValue>{writer}</S.MetaValue>
        </S.MetaItem>
        <S.MetaItem>
          <S.MetaLabel>등록일</S.MetaLabel>
          <S.MetaValue>{createdAt}</S.MetaValue>
        </S.MetaItem>
      </S.MetaInfo>
    </S.NoticeHeader>
  );
}
