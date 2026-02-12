import * as S from "../../page/profile/styles";
import fireIcon from "../../assets/image/profile/solar_fire-bold-duotone.svg";

interface StreakCardProps {
  streak: number;
}

export const StreakCard = ({ streak }: StreakCardProps) => {
  return (
    <S.StreakCard>
      <S.StreakIcon>
        <img
          src={fireIcon}
          alt="fire"
          style={{ width: "100%", height: "100%" }}
        />
      </S.StreakIcon>
      <S.StreakInfo>
        <S.StreakLabel>연속 학습일</S.StreakLabel>
        <S.StreakValue>{streak}일</S.StreakValue>
      </S.StreakInfo>
    </S.StreakCard>
  );
};
