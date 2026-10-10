import { useId } from "react";
import { OfflineModeCard } from "../components/OfflineModeCard";
import { OnlineModeCard } from "../components/OnlineModeCard";
import { OFFLINE_MODE, ONLINE_MODES } from "../consts/gameModes";
import { useOfflineProgress } from "../hooks/useOfflineProgress";

export function PlayView() {
  const progress = useOfflineProgress();
  const onlineTitleId = useId();

  return (
    <div className="space-y-6">
      <OfflineModeCard mode={OFFLINE_MODE} progress={progress} />

      <section aria-labelledby={onlineTitleId} className="space-y-3">
        <h2
          id={onlineTitleId}
          className="px-1 text-base font-semibold tracking-wider text-theme-200 uppercase"
        >
          Online
        </h2>
        <ul className="space-y-3">
          {ONLINE_MODES.map((mode) => (
            <li key={mode.id}>
              <OnlineModeCard mode={mode} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
