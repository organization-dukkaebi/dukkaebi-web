import React from "react";
import {
  NoticeTable as StyledNoticeTable,
  TableHeader,
  TableRow,
} from "../../page/notifications/list/style";

interface Notice {
  noticeId: number;
  title: string;
  writer: string;
  date: string;
  hits: number;
}

interface NoticeTableProps {
  loading: boolean;
  error: string | null;
  searchQuery: string;
  notices: Notice[];
  onNoticeClick: (noticeId: number) => void;
}

export function NoticeTable({ loading, error, searchQuery, notices, onNoticeClick }: NoticeTableProps) {
  return (
    <StyledNoticeTable>
      <TableHeader>
        <span>번호</span>
        <span>제목</span>
        <span>작성자</span>
        <span>등록일</span>
        <span>조회</span>
      </TableHeader>

      {loading ? (
        <TableRow isLast={true}>
          <span style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#9ca3af' }}>
            로딩 중...
          </span>
        </TableRow>
      ) : error ? (
        <TableRow isLast={true}>
          <span style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#ef4444' }}>
            {error}
          </span>
        </TableRow>
      ) : notices.length === 0 ? (
        <TableRow isLast={true}>
          <span style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#9ca3af' }}>
            {searchQuery ? '검색 결과가 없습니다.' : '아직 공지사항이 없습니다.'}
          </span>
        </TableRow>
      ) : (
        notices.map((notice, index) => (
          <TableRow
            key={notice.noticeId}
            isLast={index === notices.length - 1}
            onClick={() => onNoticeClick(notice.noticeId)}
          >
            <span>{notice.noticeId}</span>
            <span>{notice.title}</span>
            <span>{notice.writer}</span>
            <span>{notice.date}</span>
            <span>{notice.hits}</span>
          </TableRow>
        ))
      )}
    </StyledNoticeTable>
  );
}
