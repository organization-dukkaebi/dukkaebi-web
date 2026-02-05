import * as S from "../../page/login/style";

/**
 * 로그인 페이지 하단의 회원가입 안내 UI를 담당하는 컴포넌트
 * 페이지 상태와 무관한 단순 UI 덩어리이기 때문에 분리됨
 */

interface SignupSectionProps {
  handleSignup: () => void;
}

export function GoSignupSection({ handleSignup }: SignupSectionProps) {
  return (
    <S.SignupSection>
      <S.SignupText>아직 계정이 없으신가요?</S.SignupText>
      <S.SignupLink type="button" onClick={handleSignup}>
        회원가입
      </S.SignupLink>
    </S.SignupSection>
  );
}
