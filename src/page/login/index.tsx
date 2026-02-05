import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import * as S from "./style";
import iconMessage from "../../assets/image/auth/Message.png";
import iconChat from "../../assets/image/auth/Chat.png";
import iconHide from "../../assets/image/auth/Hide.png";
import iconFilled from "../../assets/image/auth/Filled.png";
import { LoginForm, GoSignupSection } from "../../components/login";

// Main Component
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/auth/sign-in`, {
        loginId: formData.id,
        password: formData.password,
      });

      const { refreshToken, accessToken } = response.data;
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("accessToken", accessToken);

      toast.success("로그인되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        toast.error("아이디 또는 비밀번호가 올바르지 않습니다.");
      } else {
        toast.error("로그인에 실패했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <S.LoginContainer>
      <S.LeftSection>
        <S.Title>로그인</S.Title>
        <S.Subtitle>서비스를 시작하려면 로그인 하세요.</S.Subtitle>

        <LoginForm
          formData={formData}
          showPassword={showPassword}
          isLoading={isLoading}
          iconMessage={iconMessage}
          iconChat={iconChat}
          iconHide={iconHide}
          iconFilled={iconFilled}
          handleInputChange={handleInputChange}
          handleTogglePassword={handleTogglePassword}
          handleLogin={handleLogin}
        />

        <GoSignupSection handleSignup={handleSignup} />
      </S.LeftSection>

      <S.RightSection />
    </S.LoginContainer>
  );
}
