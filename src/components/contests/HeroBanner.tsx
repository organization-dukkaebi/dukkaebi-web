import * as S from "../../page/contests/style";

interface HeroBannerProps {
  currentSlide: number;
  onPrevSlide: () => void;
  onNextSlide: () => void;
}

export const HeroBanner = ({
  currentSlide,
  onPrevSlide,
  onNextSlide,
}: HeroBannerProps) => {
  return (
    <S.HeroBanner>
      <S.HeroContent>
        <S.HeroTitle>
          DGSW
          <br />
          <S.HeroTitleHighlight>프로그래밍 대회</S.HeroTitleHighlight>
        </S.HeroTitle>
        <S.HeroSubtitle>
          DGSW Programming
          <br />
          Contest 2025
        </S.HeroSubtitle>
      </S.HeroContent>

      <S.CarouselControls>
        <S.CarouselButton onClick={onPrevSlide}>
          <svg width="24" height="24">
            <path
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14 7l-5 5l5 5"
            />
          </svg>
        </S.CarouselButton>
        <S.CarouselIndicator>
          <S.CarouselText $active>{currentSlide}</S.CarouselText>
          <S.CarouselDivider>|</S.CarouselDivider>
          <S.CarouselText $active={false}>5</S.CarouselText>
        </S.CarouselIndicator>
        <S.CarouselButton onClick={onNextSlide}>
          <svg width="24" height="24">
            <path
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m10 17l5-5l-5-5"
            />
          </svg>
        </S.CarouselButton>
      </S.CarouselControls>
    </S.HeroBanner>
  );
};
