import * as S from "../../page/profile/styles";

interface HeatmapCellData {
  date: string;
  intensity: string;
  solved: number;
}

interface HeatmapCardProps {
  heatmapData: HeatmapCellData[][];
}

export const HeatmapCard = ({ heatmapData }: HeatmapCardProps) => {
  return (
    <S.HeatmapCard>
      <S.MonthLabels>
        <S.MonthLabel>Jan</S.MonthLabel>
        <S.MonthLabel>Feb</S.MonthLabel>
        <S.MonthLabel>Mar</S.MonthLabel>
        <S.MonthLabel>Apr</S.MonthLabel>
        <S.MonthLabel>May</S.MonthLabel>
        <S.MonthLabel>Jun</S.MonthLabel>
        <S.MonthLabel>Jul</S.MonthLabel>
        <S.MonthLabel>Aug</S.MonthLabel>
      </S.MonthLabels>

      <S.HeatmapContainer>
        <S.DayLabels>
          <S.DayLabel>M</S.DayLabel>
          <S.DayLabel>T</S.DayLabel>
          <S.DayLabel>S</S.DayLabel>
        </S.DayLabels>

        <S.HeatmapGrid>
          {heatmapData.map((week, weekIndex) => (
            <S.HeatmapWeek key={weekIndex}>
              {week.map((cell, dayIndex) => (
                <S.HeatmapCell
                  key={`${cell.date}-${dayIndex}`}
                  $intensity={cell.intensity}
                  data-tooltip={`${cell.date} · ${cell.solved} 문제`}
                  aria-label={`${cell.date} · ${cell.solved} 문제`}
                  title={`${cell.date} · ${cell.solved} 문제`}
                />
              ))}
            </S.HeatmapWeek>
          ))}
        </S.HeatmapGrid>
      </S.HeatmapContainer>
    </S.HeatmapCard>
  );
};
