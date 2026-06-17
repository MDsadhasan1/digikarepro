import { cn } from "@/lib/utils";
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/lib/constants";

export default function OrderStatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("badge-pill text-xs font-semibold", ORDER_STATUS_COLORS[status] ?? "bg-muted text-muted-foreground")}>
      {ORDER_STATUS_LABELS[status] ?? status}
    </span>
  );
}
