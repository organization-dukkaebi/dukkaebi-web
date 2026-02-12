import * as S from "../../page/main/styles";
import dubiImage from "../../assets/image/main/dubi.png";

export const HeroSection = () => {
  return (
    <S.HeroCard>
      <S.HeroText>
        <S.HeroTitle>
          하루 한 문제로
          <br />
          어제보다 성장한 당신을 만들어드립니다
        </S.HeroTitle>
        <S.HeroSubtitle>
          AI가 문제 풀이를 분석해 당신의 약점을 찾아드리고, 맞춤 학습 경로를
          제안합니다.
          <br />
          단순한 문제풀이를 넘어, 실력을 완성하는 여정을 함께하세요.
        </S.HeroSubtitle>
      </S.HeroText>
      <S.DubiImage src={dubiImage} alt="Dubi Character" />
    </S.HeroCard>
  );
};
