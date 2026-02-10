import React from "react";
import { Header } from "../../../components/header";
import { Footer } from "../../../components/footer";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { NoticeHeader, NoticeContent, ActionBar } from "../../../components/notifications/info";
import * as S from "./style";

interface NoticeDetail {
  title: string;
  writer: string;
  createdAt: string;
  content: string;
  fileUrl: string;
}

export default function NoticeInfoPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [notice, setNotice] = useState<NoticeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchNotice = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      
      try {
        const response = await axiosInstance.get(`/notice/${id}`);
        setNotice(response.data);
      } catch (error) {
        console.error("Error fetching notice:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNotice();
    }
  }, [id]);

  const handleBack = () => {
    navigate("/notifications");
  };

  if (loading) {
    return (
      <S.Page>
        <Header />
        <S.Main>
          <S.Container>
            <S.LoadingText>로딩 중...</S.LoadingText>
          </S.Container>
        </S.Main>
        <Footer />
      </S.Page>
    );
  }

  if (!notice) {
    return (
      <S.Page>
        <Header />
        <S.Main>
          <S.Container>
            <S.ErrorText>공지사항을 찾을 수 없습니다.</S.ErrorText>
            <S.BackButton onClick={handleBack}>목록으로 돌아가기</S.BackButton>
          </S.Container>
        </S.Main>
        <Footer />
      </S.Page>
    );
  }

  return (
    <S.Page>
      <Header />

      <S.Main>
        <S.Container>
          <NoticeHeader 
            title={notice.title}
            writer={notice.writer}
            createdAt={notice.createdAt}
          />

          <NoticeContent 
            content={notice.content}
            fileUrl={notice.fileUrl}
          />

          <ActionBar onBackToList={handleBack} />
        </S.Container>
      </S.Main>

      <Footer />
    </S.Page>
  );
}
