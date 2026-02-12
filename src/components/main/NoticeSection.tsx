import * as S from "../../page/main/styles";
import NoticeCard from "./noticeCard";

interface Notice {
  noticeId: number;
  title: string;
  writer: string;
  date: string;
  content: string;
  fileUrl?: string;
}

interface NoticeSectionProps {
  notices: Notice[];
  onNoticeClick: (id: number) => void;
}

export const NoticeSection = ({
  notices,
  onNoticeClick,
}: NoticeSectionProps) => {
  return (
    <S.NoticeSection>
      <S.NoticeTitleGroup>
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>
          최근 공지사항
        </span>
      </S.NoticeTitleGroup>
      <S.NoticeList>
        {notices.map((notice) => (
          <NoticeCard
            key={notice.noticeId}
            title={notice.title}
            author={notice.writer}
            date={notice.date}
            content={notice.content}
            fileUrl={notice.fileUrl}
            onClick={() => onNoticeClick(notice.noticeId)}
          />
        ))}
      </S.NoticeList>
    </S.NoticeSection>
  );
};
