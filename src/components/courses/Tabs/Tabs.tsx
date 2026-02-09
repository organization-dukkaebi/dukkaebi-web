import React from "react";
import * as S from "../../../page/courses/style";

// 이 컴포넌트는 페이지의 탭(UI 덩어리)을 분리하기 위해 생성되었습니다.
// 상태(활성 탭)와 클릭 핸들러는 props로 받아 처리합니다.

interface Props {
  activeTab: "inprogress" | "completed";
  setActiveTab: (tab: "inprogress" | "completed") => void;
  navigate: (path: string) => void;
}

const Tabs: React.FC<Props> = ({ activeTab, setActiveTab, navigate }) => {
  return (
    <S.Tabs>
      <S.TabItem $active={activeTab === "inprogress"} onClick={() => setActiveTab("inprogress") }>
        학습 중인 코스
      </S.TabItem>
      <S.TabItem $active={activeTab === "completed"} onClick={() => setActiveTab("completed") }>
        완료한 코스
      </S.TabItem>
      <S.TabItem $active={false} onClick={() => navigate("/courses/explore")}>
        코스 탐방 →
      </S.TabItem>
    </S.Tabs>
  );
};

export default Tabs;
