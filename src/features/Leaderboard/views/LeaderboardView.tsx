import { LeagueSwitcher } from "../components/LeagueSwitcher";
import { PlayerRow } from "../components/PlayerRow";
import { PlayerSheet } from "../components/PlayerSheet";
import { Podium } from "../components/Podium";
import { UserRankBar } from "../components/UserRankBar";
import { CURRENT_USER_ID, MOCK_PLAYERS } from "../data/mockPlayers";
import { useLeagueNavigation } from "../hooks/useLeagueNavigation";
import { usePlayerSheet } from "../hooks/usePlayerSheet";

const PODIUM_SIZE = 3;

export function LeaderboardView() {
  const { league, canPrev, canNext, prev, next } = useLeagueNavigation();
  const sheet = usePlayerSheet();

  const podiumPlayers = MOCK_PLAYERS.slice(0, PODIUM_SIZE);
  const otherPlayers = MOCK_PLAYERS.slice(PODIUM_SIZE);
  const currentUser = MOCK_PLAYERS.find((p) => p.id === CURRENT_USER_ID);

  // Placeholder until the challenge flow exists
  const handleChallenge = () => sheet.onOpenChange(false);

  return (
    <div className="relative">
      <LeagueSwitcher
        league={league}
        canPrev={canPrev}
        canNext={canNext}
        onPrev={prev}
        onNext={next}
      />

      <Podium players={podiumPlayers} league={league} onSelect={sheet.show} />

      <ol className="space-y-3">
        {otherPlayers.map((player) => (
          <li key={player.id}>
            <PlayerRow player={player} onSelect={sheet.show} />
          </li>
        ))}
      </ol>

      {currentUser && (
        <UserRankBar
          player={currentUser}
          totalPlayers={MOCK_PLAYERS.length}
          onSelect={sheet.show}
        />
      )}

      <PlayerSheet
        player={sheet.player}
        league={league}
        open={sheet.open}
        isCurrentUser={sheet.player?.id === CURRENT_USER_ID}
        onOpenChange={sheet.onOpenChange}
        onChallenge={handleChallenge}
      />
    </div>
  );
}
