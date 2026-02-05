import * as S from "../../page/signup/style";

/**
 * 회원가입 페이지의 입력 폼 UI만 담당하는 컴포넌트
 * 페이지 전역 상태를 알 필요가 없는 JSX 기준 UI 덩어리이기 때문에 분리됨
 */

interface SignupFormProps {
  formData: {
    id: string;
    password: string;
    nickname: string;
  };
  showPassword: boolean;
  isLoading: boolean;
  iconMessage: string;
  iconChat: string;
  iconHide: string;
  iconFilled: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTogglePassword: () => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function SignupForm({
  formData,
  showPassword,
  isLoading,
  iconMessage,
  iconChat,
  iconHide,
  iconFilled,
  handleInputChange,
  handleTogglePassword,
  handleLogin,
}: SignupFormProps) {
  return (
    <form onSubmit={handleLogin}>
      <S.FormGroup>
        <S.InputWrapper>
          <S.InputIcon src={iconMessage} alt="ID icon" />
          <S.Input
            id="id"
            name="id"
            type="text"
            placeholder="ID"
            value={formData.id}
            onChange={handleInputChange}
            required
          />
        </S.InputWrapper>
      </S.FormGroup>

      <S.FormGroup>
        <S.PasswordInputWrapper>
          <S.InputIcon src={iconChat} alt="Password icon" />
          <S.Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <S.TogglePasswordBtn
            type="button"
            onClick={handleTogglePassword}
            aria-label="Toggle password visibility"
          >
            <S.PasswordToggleIcon
              src={showPassword ? iconFilled : iconHide}
              alt="Toggle password"
            />
          </S.TogglePasswordBtn>
        </S.PasswordInputWrapper>
      </S.FormGroup>

      <S.FormGroup>
        <S.PasswordInputWrapper>
          <S.InputIcon src={iconChat} alt="Nickname icon" />
          <S.Input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="Nickname"
            value={formData.nickname}
            onChange={handleInputChange}
            required
          />
          <S.TogglePasswordBtn
            type="button"
            onClick={handleTogglePassword}
            aria-label="Toggle password visibility"
          ></S.TogglePasswordBtn>
        </S.PasswordInputWrapper>
      </S.FormGroup>

      <S.FormGroup>
        <S.LoginButton type="submit" disabled={isLoading}>
          {isLoading ? "회원가입중..." : "회원가입"}
        </S.LoginButton>
      </S.FormGroup>
    </form>
  );
}
