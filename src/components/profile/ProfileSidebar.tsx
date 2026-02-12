import * as S from "../../page/profile/styles";
import profileImage from "../../assets/image/profile/profile_image.svg";

interface ProfileSidebarProps {
  name: string;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

export const ProfileSidebar = ({
  name,
  onLogout,
  onDeleteAccount,
}: ProfileSidebarProps) => {
  return (
    <S.Sidebar>
      <S.ProfileSection>
        <S.ProfileImage src={profileImage} alt="profile" />
        <S.UserName>{name || "로딩 중..."}</S.UserName>
        <S.Divider />
      </S.ProfileSection>
      <S.AccountActions>
        <S.AccountButton onClick={onLogout}>로그아웃</S.AccountButton>
        <S.AccountButton onClick={onDeleteAccount}>회원탈퇴</S.AccountButton>
      </S.AccountActions>
    </S.Sidebar>
  );
};
