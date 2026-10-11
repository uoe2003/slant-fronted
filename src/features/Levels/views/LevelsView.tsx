import { LevelCategory } from "../components/LevelCategory";
import { TotalStatsCard } from "../components/TotalStatsCard";
import { useLevelNavigation } from "../hooks/useLevelNavigation";
import { useLevelsProgress } from "../hooks/useLevelsProgress";

export function LevelsView() {
  const { categories, totalStars, maxStars } = useLevelsProgress();
  const { playLevel } = useLevelNavigation();

  return (
    <div className="w-full flex animate-in flex-col gap-8 duration-200 zoom-in-95 motion-reduce:animate-none">
      <TotalStatsCard totalStars={totalStars} maxStars={maxStars} />

      {categories.map((progress) => (
        <LevelCategory
          key={progress.category}
          progress={progress}
          onSelect={playLevel}
        />
      ))}
    </div>
  );
}
