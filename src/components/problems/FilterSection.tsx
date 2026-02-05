/**
 * 난이도, 시간, 정답률 필터 UI를 담당하는 컴포넌트
 * 드롭다운 상태와 선택 로직은 페이지에서 전달받아 그대로 사용함
 */
import * as S from "../../page/problems/style";
import ArrowDownIcon from "../../assets/image/problems/arrow-down.png";

interface FilterSectionProps {
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  openDropdown: string | null;
  setOpenDropdown: (value: string | null) => void;
  difficultyFilter: number | null;
  difficultyLabel: string | null;
  sortBy: string | null;
  timeLabel: string | null;
  successRateFilter: "asc" | "desc" | null;
  successRateLabel: string | null;
  onDifficultySelect: (level: number | null, label: string | null) => void;
  onTimeSelect: (time: string | null, label: string | null) => void;
  onSuccessRateSelect: (
    order: "asc" | "desc" | null,
    label: string | null,
  ) => void;
}

export function FilterSection(props: FilterSectionProps) {
  const {
    dropdownRef,
    openDropdown,
    setOpenDropdown,
    difficultyFilter,
    difficultyLabel,
    sortBy,
    timeLabel,
    successRateFilter,
    successRateLabel,
    onDifficultySelect,
    onTimeSelect,
    onSuccessRateSelect,
  } = props;

  return (
    <S.FilterSection ref={dropdownRef}>
      <S.FilterButtonsWrapper>
        {/* 난이도 */}
        <S.FilterButtonGroup>
          <S.FilterButton
            isActive={
              openDropdown === "difficulty" || difficultyFilter !== null
            }
            onClick={() =>
              setOpenDropdown(
                openDropdown === "difficulty" ? null : "difficulty",
              )
            }
          >
            {difficultyLabel || "난이도"}
            <S.ArrowIcon src={ArrowDownIcon} alt="드롭다운" />
          </S.FilterButton>

          {openDropdown === "difficulty" && (
            <S.DropdownMenu>
              <S.DropdownItem
                isSelected={difficultyFilter === null}
                onClick={() => onDifficultySelect(null, null)}
              >
                선택 안함
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={difficultyFilter === 1}
                onClick={() => onDifficultySelect(1, "금")}
              >
                금
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={difficultyFilter === 2}
                onClick={() => onDifficultySelect(2, "은")}
              >
                은
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={difficultyFilter === 3}
                onClick={() => onDifficultySelect(3, "동")}
              >
                동
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={difficultyFilter === 4}
                onClick={() => onDifficultySelect(4, "철")}
              >
                철
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={difficultyFilter === 5}
                onClick={() => onDifficultySelect(5, "옥")}
              >
                옥
              </S.DropdownItem>
            </S.DropdownMenu>
          )}
        </S.FilterButtonGroup>

        {/* 시간 */}
        <S.FilterButtonGroup>
          <S.FilterButton
            isActive={openDropdown === "time" || sortBy !== null}
            onClick={() =>
              setOpenDropdown(openDropdown === "time" ? null : "time")
            }
          >
            {timeLabel || "시간"}
            <S.ArrowIcon src={ArrowDownIcon} alt="드롭다운" />
          </S.FilterButton>

          {openDropdown === "time" && (
            <S.DropdownMenu>
              <S.DropdownItem
                isSelected={sortBy === null}
                onClick={() => onTimeSelect(null, null)}
              >
                선택 안함
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={sortBy === "recent"}
                onClick={() => onTimeSelect("recent", "최신순")}
              >
                최신순
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={sortBy === "old"}
                onClick={() => onTimeSelect("old", "오래된순")}
              >
                오래된순
              </S.DropdownItem>
            </S.DropdownMenu>
          )}
        </S.FilterButtonGroup>

        {/* 정답률 */}
        <S.FilterButtonGroup>
          <S.FilterButton
            isActive={
              openDropdown === "successRate" || successRateFilter !== null
            }
            onClick={() =>
              setOpenDropdown(
                openDropdown === "successRate" ? null : "successRate",
              )
            }
          >
            {successRateLabel || "정답률"}
            <S.ArrowIcon src={ArrowDownIcon} alt="드롭다운" />
          </S.FilterButton>

          {openDropdown === "successRate" && (
            <S.DropdownMenu>
              <S.DropdownItem
                isSelected={successRateFilter === null}
                onClick={() => onSuccessRateSelect(null, null)}
              >
                선택 안함
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={successRateFilter === "asc"}
                onClick={() => onSuccessRateSelect("asc", "정답률 낮은 순")}
              >
                정답률 낮은 순
              </S.DropdownItem>
              <S.DropdownItem
                isSelected={successRateFilter === "desc"}
                onClick={() => onSuccessRateSelect("desc", "정답률 높은 순")}
              >
                정답률 높은 순
              </S.DropdownItem>
            </S.DropdownMenu>
          )}
        </S.FilterButtonGroup>
      </S.FilterButtonsWrapper>
    </S.FilterSection>
  );
}
