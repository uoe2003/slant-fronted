import { Star } from "lucide-react";
import { formatNumber } from "@/utils/format";

interface StarPriceProps {
  amount: number;
}

export function StarPrice({ amount }: StarPriceProps) {
  return (
    <div className="flex items-center justify-center gap-1 tabular-nums">
      <Star aria-hidden="true" className="size-4 fill-current" />
      {formatNumber(amount)}
    </div>
  );
}
