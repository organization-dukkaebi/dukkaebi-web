import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as S from "./style";
import iconMessage from "../../assets/image/auth/Message.png";
import iconChat from "../../assets/image/auth/Chat.png";
import iconHide from "../../assets/image/auth/Hide.png";
import iconFilled from "../../assets/image/auth/Filled.png";
import { GoLoginSection, SignupForm } from "../../components/signup";

// Main Component
export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: "",
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
      const response = await axios.post(`${apiUrl}/auth/sign-up`, {
        loginId: formData.id,
        password: formData.password,
        nickname: formData.nickname,
      });

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    navigate("/login");
  };

  return (
    <S.LoginContainer>
      <S.LeftSection>
        <S.Title>회원가입</S.Title>
        <S.Subtitle>서비스에 가입하려면 회원가입 하세요.</S.Subtitle>

        <SignupForm
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

        <GoLoginSection handleSignup={handleSignup} />
      </S.LeftSection>

      <S.RightSection />
    </S.LoginContainer>
  );
}
