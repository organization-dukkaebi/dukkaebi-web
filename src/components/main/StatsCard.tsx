import * as S from "../../page/main/styles";
import fireIcon from "../../assets/image/main/solar_fire-bold-duotone.svg";

interface HeatmapCellData {
  date: string;
  intensity: string;
  solved: number;
}

interface StatsCardProps {
  streak: number;
  heatmapData: HeatmapCellData[];
}

export const StatsCard = ({ streak, heatmapData }: StatsCardProps) => {
  return (
    <S.StatsCard>
      <S.StreakInfo>
        <S.StreakContent>
          <S.StreakIcon>
            <img
              src={fireIcon}
              alt="Fire"
              style={{ width: "100%", height: "100%" }}
            />
          </S.StreakIcon>
          <S.StreakText>
            <S.StreakLabel>연속 학습일</S.StreakLabel>
            <S.StreakValue>{streak}일</S.StreakValue>
          </S.StreakText>
        </S.StreakContent>
        <S.Divider />
      </S.StreakInfo>

      <S.HeatmapSection>
        <S.DayLabels>
          <S.DayLabel>M</S.DayLabel>
          <S.DayLabel>T</S.DayLabel>
          <S.DayLabel>S</S.DayLabel>
        </S.DayLabels>

        <S.HeatmapGrid>
          {heatmapData.map((cell) => (
            <S.HeatmapCell
              key={cell.date}
              $intensity={cell.intensity}
              data-tooltip={`${cell.date} · ${cell.solved} 문제`}
              aria-label={`${cell.date} · ${cell.solved} 문제`}
              title={`${cell.date} · ${cell.solved} 문제`}
            />
          ))}
        </S.HeatmapGrid>
      </S.HeatmapSection>
    </S.StatsCard>
  );
};
