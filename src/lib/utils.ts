import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mapValue(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number) {
  return (value - fromLow) * (toHigh - toLow) / (fromHigh - fromLow) + toLow;
}

export function constrainValue(value: number, min: number, max: number) {
  return Math.min(max, Math.max(value, min))
}

export function CapitalizeString(string: string) {
  return string.at(0)?.toUpperCase() + string.slice(1)
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}