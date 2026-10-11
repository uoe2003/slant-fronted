import { GlassCard } from "@/components/GlassCard";
import { StarPrice } from "./StarPrice";

interface StarBalanceProps {
  stars: number;
}

export function StarBalance({ stars }: StarBalanceProps) {
  return (
    <GlassCard className="inline-flex items-center rounded-full px-4 py-2 text-amber-300">
      <span className="sr-only">Tus estrellas: </span>
      <span aria-live="polite" className="text-[15px] font-bold">
        <StarPrice amount={stars} />
      </span>
    </GlassCard>
  );
}
