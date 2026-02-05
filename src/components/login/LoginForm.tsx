import * as S from "../../page/login/style";

/**
 * 로그인 페이지에서 입력 폼 영역만 담당하는 UI 컴포넌트
 * 페이지 전체 상태를 알 필요가 없고, JSX 기준으로 의미 있는 덩어리이기 때문에 분리됨
 */

interface LoginFormProps {
  formData: {
    id: string;
    password: string;
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

export function LoginForm({
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
}: LoginFormProps) {
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
        <S.LoginButton type="submit" disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </S.LoginButton>
      </S.FormGroup>
    </form>
  );
}
