import * as S from "../../page/signup/style";

/**
 * 회원가입 페이지 하단의 로그인 이동 안내 UI 컴포넌트
 * 단순 UI 영역이며 페이지 상태와 분리 가능하여 컴포넌트로 분리됨
 */

interface LoginSectionProps {
  handleSignup: () => void;
}

export function GoLoginSection({ handleSignup }: LoginSectionProps) {
  return (
    <S.SignupSection>
      <S.SignupText>이미 계정이 있으신가요?</S.SignupText>
      <S.SignupLink type="button" onClick={handleSignup}>
        로그인
      </S.SignupLink>
    </S.SignupSection>
  );
}
