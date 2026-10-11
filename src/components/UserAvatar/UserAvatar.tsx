import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  src?: string;
  className?: string;
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function UserAvatar({ name, src, className }: UserAvatarProps) {
  return (
    <Avatar className={cn("border border-border", className)}>
      <AvatarImage src={src} alt="" />
      <AvatarFallback className="font-bold">{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
}
