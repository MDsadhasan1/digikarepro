import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "icon";
  className?: string;
  href?: string;
  dark?: boolean;
}

export default function Logo({
  variant = "full",
  className,
  href = "/",
  dark = false,
}: LogoProps) {
  const src = variant === "icon"
    ? "/logo-icon.svg"
    : dark
      ? "/logo-dark.svg"
      : "/logo.svg";

  const sizes = variant === "icon"
    ? { width: 36, height: 36 }
    : { width: 180, height: 36 };

  return (
    <Link href={href} className={cn("inline-flex items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="dogikarepro"
        width={sizes.width}
        height={sizes.height}
        className="h-9 w-auto"
        draggable={false}
      />
    </Link>
  );
}
