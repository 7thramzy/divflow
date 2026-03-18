"use client";
import { getStatusBadge, getStatusLabel } from "@/lib/utils";

interface Props {
  status: string;
  label?: string;
}

export function StatusBadge({ status, label }: Props) {
  const classes = getStatusBadge(status);
  return (
    <span className={classes}>
      {label ?? getStatusLabel(status)}
    </span>
  );
}
